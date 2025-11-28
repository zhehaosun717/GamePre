import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Menu, MessageSquare, Power } from 'lucide-react';
import { AppState } from '../types';

interface GameBoyContainerProps {
  children: React.ReactNode;
  onNext: () => void;
  onPrev: () => void;
  onSelect: () => void;
  onStart: () => void;
  state: AppState;
}

export const GameBoyContainer: React.FC<GameBoyContainerProps> = ({ 
  children, 
  onNext, 
  onPrev, 
  onSelect,
  onStart,
  state 
}) => {
  const [isPowered, setIsPowered] = useState(true);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPowered) return;
      
      switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'd':
        case 's':
          onNext();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'a':
        case 'w':
          onPrev();
          break;
        case 'Enter':
        case 'z':
          onSelect(); // Simulate A button
          break;
        case 'Shift':
        case 'x':
          onStart(); // Simulate Start/Select
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onSelect, onStart, isPowered]);

  const togglePower = () => setIsPowered(!isPowered);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-200">
      {/* Device Body - Widened for 16:9 screen support */}
      <div className="relative w-[340px] md:w-[960px] md:h-[580px] h-auto bg-[#c0c0c0] rounded-b-[40px] rounded-t-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_-5px_-5px_10px_rgba(0,0,0,0.1),inset_5px_5px_10px_rgba(255,255,255,0.5)] flex flex-col md:flex-row overflow-hidden border-b-8 border-r-8 border-[#a0a0a0]">
        
        {/* Top Decorative Lines */}
        <div className="absolute top-6 left-4 right-4 h-6 border-b-2 border-t-2 border-[#909090] flex items-center justify-center space-x-2 z-10 pointer-events-none md:block hidden">
            <span className="text-[10px] text-[#909090] font-sans font-bold tracking-widest bg-[#c0c0c0] px-2">DOT MATRIX WITH STEREO SOUND</span>
        </div>

        {/* Left Side: Screen Area */}
        <div className="flex-1 pl-12 pr-8 py-12 md:pl-16 md:pr-4 flex flex-col justify-center relative">
          
          {/* Battery LED - Restored to Main Body */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-[52px] flex flex-col items-center gap-1 z-20">
             <div className={`w-3 h-3 rounded-full transition-colors duration-500 shadow-inner border border-black/30 ${isPowered ? 'bg-red-600 shadow-[0_0_8px_rgba(255,0,0,0.8)]' : 'bg-[#301010]'}`}></div>
             <span className="text-[6px] md:text-[8px] uppercase font-sans text-gray-500 tracking-wider font-bold">Battery</span>
          </div>

          {/* Screen Bezel (Dark Grey) - Extended Left */}
          {/* Added -ml-4 to pull it left towards the battery, creating the "extended" look */}
          <div className="bg-[#505560] rounded-t-[10px] rounded-b-[30px] p-6 pb-8 pl-8 md:pl-20 relative shadow-inner flex flex-col items-center justify-center md:-ml-2">
            
            {/* Bezel Text Row */}
            <div className="w-full flex justify-between text-[10px] text-gray-400 mb-1 font-bold tracking-wider px-2 h-4">
               {/* Empty placeholder */}
            </div>

            {/* LCD Screen Container - Enforced Aspect Ratio */}
            <div className="bg-[#8bac0f] w-full aspect-video rounded-sm shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] overflow-hidden relative border-4 border-[#758866]">
              {isPowered ? (
                children
              ) : (
                <div className="w-full h-full bg-[#3d422d] flex items-center justify-center">
                    <div className="w-full h-1 bg-[#2d321d] opacity-50"></div>
                </div>
              )}
            </div>
             <div className="text-center mt-2 w-full">
                <span className="italic font-serif text-gray-400 text-lg tracking-widest font-bold">Nintendo</span>
             </div>
          </div>
        </div>

        {/* Right Side: Controls Area */}
        <div className="md:w-72 w-full p-6 md:p-8 flex flex-col justify-end md:justify-center items-center relative">
          
          {/* Logo - Moved down further to top-24 */}
          <div className="absolute top-24 right-6 font-sans font-bold italic text-[#303080] text-xl hidden md:block">
            GameBoy
          </div>

          <div className="flex flex-row md:flex-col items-center justify-between w-full h-full md:h-auto gap-8">
            
            {/* D-Pad */}
            <div className="w-32 h-32 relative flex-shrink-0">
               <div className="absolute top-10 left-0 w-full h-10 bg-[#333] rounded-sm shadow-md"></div>
               <div className="absolute top-0 left-10 w-10 h-full bg-[#333] rounded-sm shadow-md"></div>
               <div className="absolute top-11 left-11 w-8 h-8 bg-[#222] rounded-full radial-gradient"></div>
               
               {/* Click areas */}
               <button onClick={onPrev} className="absolute top-0 left-10 w-10 h-10 hover:bg-white/10 active:bg-white/20 transition-colors rounded-t-sm group" aria-label="Up">
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-[#222] mx-auto mb-1 group-active:translate-y-0.5 transition-transform"></div>
               </button>
               <button onClick={onNext} className="absolute bottom-0 left-10 w-10 h-10 hover:bg-white/10 active:bg-white/20 transition-colors rounded-b-sm group" aria-label="Down">
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#222] mx-auto mt-1 group-active:translate-y-0.5 transition-transform"></div>
               </button>
               <button onClick={onPrev} className="absolute top-10 left-0 w-10 h-10 hover:bg-white/10 active:bg-white/20 transition-colors rounded-l-sm group" aria-label="Left">
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-[#222] mx-auto mr-1 group-active:translate-x-0.5 transition-transform"></div>
               </button>
               <button onClick={onNext} className="absolute top-10 right-0 w-10 h-10 hover:bg-white/10 active:bg-white/20 transition-colors rounded-r-sm group" aria-label="Right">
                  <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-[#222] mx-auto ml-1 group-active:translate-x-0.5 transition-transform"></div>
               </button>
            </div>

            {/* A/B Buttons */}
            <div className="relative w-40 h-24 transform -rotate-12 mt-4">
               <div className="absolute bottom-2 left-0 flex flex-col items-center">
                  <button 
                    onClick={onPrev}
                    className="w-12 h-12 rounded-full bg-[#a00] shadow-[0_3px_0_#500,0_5px_5px_rgba(0,0,0,0.4)] active:shadow-[0_1px_0_#500] active:translate-y-1 transition-all border-b-2 border-l-2 border-[#ffaaaa30]"
                    aria-label="B Button"
                  ></button>
                  <span className="font-sans font-bold text-[#303080] mt-2 tracking-widest">B</span>
               </div>
               <div className="absolute top-0 right-0 flex flex-col items-center">
                  <button 
                    onClick={onSelect}
                    className="w-12 h-12 rounded-full bg-[#a00] shadow-[0_3px_0_#500,0_5px_5px_rgba(0,0,0,0.4)] active:shadow-[0_1px_0_#500] active:translate-y-1 transition-all border-b-2 border-l-2 border-[#ffaaaa30]"
                    aria-label="A Button"
                  ></button>
                  <span className="font-sans font-bold text-[#303080] mt-2 tracking-widest">A</span>
               </div>
            </div>

          </div>

          {/* Select / Start */}
          <div className="flex justify-center space-x-4 mt-8 md:mt-12 mb-4 w-full transform -rotate-12">
             <div className="flex flex-col items-center">
                <button 
                  onClick={onSelect} // Mapped to chat
                  className="w-16 h-4 bg-[#666] rounded-full border border-gray-500 shadow-sm active:bg-[#555] active:translate-y-0.5 transition-all"
                ></button>
                <span className="text-[10px] font-bold text-[#303080] mt-1 tracking-widest">SELECT</span>
             </div>
             <div className="flex flex-col items-center">
                <button 
                  onClick={onStart} // Mapped to toggle menu/reset or just chat too
                  className="w-16 h-4 bg-[#666] rounded-full border border-gray-500 shadow-sm active:bg-[#555] active:translate-y-0.5 transition-all"
                ></button>
                <span className="text-[10px] font-bold text-[#303080] mt-1 tracking-widest">START</span>
             </div>
          </div>

          {/* Speaker Grille */}
          <div className="absolute bottom-6 right-6 flex space-x-2 transform -rotate-12 opacity-50 pointer-events-none">
             <div className="w-2 h-16 bg-gray-400 rounded-full shadow-inner"></div>
             <div className="w-2 h-16 bg-gray-400 rounded-full shadow-inner"></div>
             <div className="w-2 h-16 bg-gray-400 rounded-full shadow-inner"></div>
             <div className="w-2 h-16 bg-gray-400 rounded-full shadow-inner"></div>
             <div className="w-2 h-16 bg-gray-400 rounded-full shadow-inner"></div>
             <div className="w-2 h-16 bg-gray-400 rounded-full shadow-inner"></div>
          </div>

        </div>
      </div>

      <div className="fixed bottom-4 right-4 text-xs text-gray-400 font-sans hidden md:block">
        Use Arrow Keys or WASD to Navigate • Enter/Z for A • Shift/X for Start
      </div>

      <button 
        onClick={togglePower}
        className="fixed top-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors z-50 flex items-center gap-2"
      >
        <Power size={16} />
        <span className="text-xs font-bold">{isPowered ? 'OFF' : 'ON'}</span>
      </button>

    </div>
  );
};