import React from 'react';
import { Slide } from '../types';
import { Upload } from 'lucide-react';

interface ScreenContentProps {
  slide: Slide;
  onImageUpdate?: (id: number, url: string) => void;
}

export const ScreenContent: React.FC<ScreenContentProps> = ({ slide, onImageUpdate }) => {
  const renderSlideContent = () => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-3 md:space-y-4 p-4">
            <h1 className="text-2xl md:text-4xl font-pixel text-[#0f380f] leading-tight tracking-widest uppercase filter drop-shadow-sm max-w-full break-words">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <h2 className="text-lg md:text-xl font-lcd text-[#306230] uppercase border-b-2 border-[#306230] pb-1 max-w-[90%]">
                {slide.subtitle}
              </h2>
            )}
             {slide.content && (
              <p className="mt-4 md:mt-8 animate-pulse text-[#0f380f] font-pixel text-[10px] md:text-xs">
                {slide.content[0]}
              </p>
            )}
          </div>
        );
      
      case 'section':
        return (
          <div className="h-full flex flex-col items-center justify-center bg-[#0f380f] text-[#9bbc0f] p-4 text-center">
            <h1 className="text-5xl md:text-7xl font-pixel mb-4">{slide.title}</h1>
            <div className="w-16 h-2 bg-[#9bbc0f] mb-4"></div>
            <h2 className="text-xl md:text-3xl font-lcd uppercase tracking-widest px-4">{slide.subtitle}</h2>
          </div>
        );

      case 'image-text':
        return (
          <div className="h-full flex flex-col p-1 md:p-2">
            <div className="border-b-2 border-[#0f380f] mb-2 pb-1 shrink-0">
               <h2 className="text-lg md:text-xl font-pixel text-[#0f380f] truncate">{slide.title}</h2>
               {slide.subtitle && <h3 className="text-base md:text-lg font-lcd text-[#306230] truncate">{slide.subtitle}</h3>}
            </div>
            <div className="flex-1 flex flex-col md:flex-row gap-2 md:gap-4 overflow-hidden min-h-0">
               <div className="flex-1 overflow-y-auto lcd-scroll font-lcd text-base md:text-lg text-[#0f380f] leading-snug min-w-0 pr-1">
                  <ul className="list-none space-y-2">
                    {slide.content?.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
               </div>
               {slide.imageUrl && (
                 <div className="flex-shrink-0 w-full md:w-[40%] h-24 md:h-full relative border-4 border-[#0f380f] bg-[#0f380f] p-1 flex items-center justify-center group">
                    <label className="cursor-pointer w-full h-full relative block">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file && onImageUpdate) {
                            const url = URL.createObjectURL(file);
                            onImageUpdate(slide.id, url);
                          }
                        }}
                      />
                      <img 
                        src={slide.imageUrl} 
                        alt={slide.title} 
                        className="w-full h-full object-contain filter contrast-125 sepia hover:sepia-0 transition-all"
                        style={{imageRendering: 'pixelated'}}
                      />
                      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload className="text-[#9bbc0f] w-6 h-6 mb-1" />
                        <span className="font-pixel text-[6px] text-[#9bbc0f] text-center px-1">UPLOAD GIF</span>
                      </div>
                    </label>
                 </div>
               )}
            </div>
            {slide.citations && (
              <div className="mt-1 text-[8px] md:text-[10px] font-lcd text-[#306230] border-t border-[#306230] pt-1 shrink-0 truncate">
                {slide.citations.join('; ')}
              </div>
            )}
          </div>
        );

      case 'list':
      case 'content':
      default:
        return (
          <div className="h-full flex flex-col p-1 md:p-2">
            <div className="border-b-4 border-double border-[#0f380f] mb-2 md:mb-4 pb-1 md:pb-2 shrink-0">
              <h2 className="text-xl md:text-3xl font-pixel text-[#0f380f] uppercase truncate">{slide.title}</h2>
              {slide.subtitle && <p className="text-lg md:text-xl font-lcd text-[#306230] mt-1 truncate">> {slide.subtitle}</p>}
            </div>
            <div className="flex-1 overflow-y-auto lcd-scroll pr-2">
              <ul className="space-y-2 md:space-y-4 font-lcd text-lg md:text-2xl text-[#0f380f]">
                {slide.content?.map((line, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 md:mr-3 mt-1.5 block w-1.5 h-1.5 md:w-2 md:h-2 bg-[#0f380f] shrink-0"></span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
             {slide.citations && (
              <div className="mt-auto pt-2 text-[10px] md:text-xs font-lcd text-[#306230] italic shrink-0">
                Ref: {slide.citations.join(', ')}
              </div>
            )}
          </div>
        );
      
      case 'end':
        return (
           <div className="h-full flex flex-col items-center justify-center text-center space-y-4 bg-[repeating-linear-gradient(45deg,#8bac0f,#8bac0f_10px,#9bbc0f_10px,#9bbc0f_20px)] p-4">
             <div className="bg-[#9bbc0f] p-4 md:p-8 border-4 border-[#0f380f] shadow-[4px_4px_0px_0px_#0f380f] max-w-full">
                <h1 className="text-3xl md:text-4xl font-pixel text-[#0f380f] mb-2 md:mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl font-lcd text-[#306230] mb-4 md:mb-6">{slide.subtitle}</p>
                <div className="animate-bounce font-pixel text-[10px] md:text-xs text-[#0f380f] bg-white/20 p-2 rounded inline-block">
                  {slide.content?.[0]}
                </div>
             </div>
           </div>
        );
    }
  };

  return (
    <div className="w-full h-full p-2 md:p-4 bg-[#8bac0f] relative overflow-hidden selection:bg-[#0f380f] selection:text-[#9bbc0f]">
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>
      
      {/* Grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#0f380f_1px,transparent_1px)] [background-size:4px_4px] z-0"></div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {renderSlideContent()}
      </div>
    </div>
  );
};