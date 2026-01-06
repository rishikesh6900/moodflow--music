import React from 'react';
import { MoodType, ThemeMap } from '../types';

interface MoodSelectorProps {
  currentMood: MoodType | null;
  onSelectMood: (mood: MoodType) => void;
  themes: ThemeMap;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ currentMood, onSelectMood, themes }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-8 z-50">
      {(Object.keys(themes) as MoodType[]).map((mood) => {
        const theme = themes[mood];
        const isActive = currentMood === mood;
        
        return (
          <button
            key={mood}
            onClick={() => onSelectMood(mood)}
            className={`
              relative flex items-center gap-2 px-6 py-3 rounded-full 
              font-semibold transition-all duration-500 overflow-hidden
              group
              ${isActive 
                ? `bg-white text-black scale-105 ${theme.glowColor} shadow-[0_0_30px_-5px_var(--tw-shadow-color)]` 
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }
            `}
          >
            {/* Hover Glow Background */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${theme.secondary}`}></div>
            
            {/* Icon */}
            <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
               {React.cloneElement(theme.icon as React.ReactElement, { 
                 className: isActive ? `text-${theme.primary.split('-')[1]}-600` : 'text-current' 
               })}
            </span>
            
            <span className="relative z-10 tracking-wide uppercase text-sm">
              {mood}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default MoodSelector;