import React, { useState, useRef, useEffect } from 'react';
import { AppState, ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { X, Send } from 'lucide-react';

interface AIChatOverlayProps {
  onClose: () => void;
  history: ChatMessage[];
  setHistory: (history: ChatMessage[]) => void;
}

export const AIChatOverlay: React.FC<AIChatOverlayProps> = ({ onClose, history, setHistory }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    const newHistory = [...history, userMsg];
    setHistory(newHistory);
    setInput('');
    setIsLoading(true);

    const response = await sendMessageToGemini(newHistory, input);
    
    setHistory([...newHistory, { role: 'model', text: response || 'Error.' }]);
    setIsLoading(false);
  };

  return (
    <div className="absolute inset-0 bg-[#0f380f]/95 z-20 flex flex-col font-lcd p-2">
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-[#9bbc0f] pb-1 mb-2">
        <h3 className="text-[#9bbc0f] text-xl">AI ASSISTANT</h3>
        <button onClick={onClose} className="text-[#9bbc0f] hover:text-white">
          <X size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto lcd-scroll mb-2 space-y-3 p-1"
      >
        {history.length === 0 && (
            <div className="text-[#306230] text-center mt-10">
                ASK ME ABOUT LUDONARRATIVE DISSONANCE...
            </div>
        )}
        {history.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <span className="text-[10px] text-[#306230] mb-0.5">{msg.role === 'user' ? 'YOU' : 'SYSTEM'}</span>
            <div className={`p-2 max-w-[90%] text-lg leading-tight ${
              msg.role === 'user' 
                ? 'bg-[#9bbc0f] text-[#0f380f]' 
                : 'border border-[#9bbc0f] text-[#9bbc0f]'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
             <div className="flex flex-col items-start animate-pulse">
                <span className="text-[10px] text-[#306230] mb-0.5">SYSTEM</span>
                <div className="border border-[#9bbc0f] text-[#9bbc0f] p-2">
                    PROCESSING...
                </div>
            </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-2 border-t-2 border-[#9bbc0f] pt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="TYPE QUERY..."
          className="flex-1 bg-transparent border border-[#306230] text-[#9bbc0f] placeholder-[#306230] p-1 font-lcd text-lg focus:outline-none focus:border-[#9bbc0f]"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="text-[#0f380f] bg-[#9bbc0f] p-1 hover:bg-[#8bac0f] disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};
