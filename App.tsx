import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { GameBoyContainer } from './components/GameBoyContainer';
import { ScreenContent } from './components/ScreenContent';
import { AIChatOverlay } from './components/AIChatOverlay';
import { slides } from './data/slides';
import { AppState, ChatMessage, Slide } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentSlideIndex: 0,
    isChatOpen: false,
    chatHistory: [],
    isLoading: false,
  });

  // Load slides into state to allow modification (e.g. uploading GIFs)
  const [slidesData, setSlidesData] = useState<Slide[]>(slides);

  const handleNext = () => {
    if (state.isChatOpen) return;
    setState(prev => ({
      ...prev,
      currentSlideIndex: Math.min(prev.currentSlideIndex + 1, slidesData.length - 1)
    }));
  };

  const handlePrev = () => {
    if (state.isChatOpen) return;
    setState(prev => ({
      ...prev,
      currentSlideIndex: Math.max(prev.currentSlideIndex - 1, 0)
    }));
  };

  const toggleChat = () => {
    setState(prev => ({
      ...prev,
      isChatOpen: !prev.isChatOpen
    }));
  };

  const setChatHistory = (history: ChatMessage[]) => {
    setState(prev => ({ ...prev, chatHistory: history }));
  };

  const handleImageUpdate = (slideId: number, newImageUrl: string) => {
    setSlidesData(prev => prev.map(s => 
      s.id === slideId ? { ...s, imageUrl: newImageUrl } : s
    ));
  };

  const currentSlide = slidesData[state.currentSlideIndex];

  return (
    <GameBoyContainer
      onNext={handleNext}
      onPrev={handlePrev}
      onSelect={toggleChat}
      onStart={toggleChat}
      state={state}
    >
      {state.isChatOpen ? (
        <AIChatOverlay 
          onClose={toggleChat} 
          history={state.chatHistory}
          setHistory={setChatHistory}
        />
      ) : (
        <>
          <ScreenContent 
            slide={currentSlide} 
            onImageUpdate={handleImageUpdate}
          />
          {/* Page Indicator overlay */}
          <div className="absolute bottom-1 right-1 text-[10px] font-lcd text-[#0f380f] bg-[#9bbc0f]/80 px-1 pointer-events-none">
             {state.currentSlideIndex + 1} / {slidesData.length}
          </div>
          {/* Hint overlay */}
          <div className="absolute top-1 right-1 text-[10px] font-pixel text-[#306230] opacity-50 animate-pulse pointer-events-none">
            {state.currentSlideIndex === 0 ? "PRESS START" : ""}
          </div>
        </>
      )}
    </GameBoyContainer>
  );
};

export default App;