import React from 'react';
import { MoodType, MoodTheme } from '../types';

interface BackgroundProps {
  theme: MoodTheme | null;
  mood: MoodType | null;
}

const Background: React.FC<BackgroundProps> = ({ theme, mood }) => {
  // Default dark neutral background if no mood is selected
  const gradient = theme ? theme.backgroundGradient : 'from-gray-900 to-black';
  const orbs = theme ? theme.orbColors : ['bg-gray-800', 'bg-gray-700', 'bg-gray-900'];
  
  // Animation speed classes determined by mood
  let animDuration = 'duration-[10s]';
  if (mood === MoodType.Angry) animDuration = 'duration-[2s]';
  if (mood === MoodType.Happy) animDuration = 'duration-[6s]';
  if (mood === MoodType.Calm) animDuration = 'duration-[20s]';
  if (mood === MoodType.Sad) animDuration = 'duration-[15s]';

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none isolate">
      {/* Base Gradient Layer */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-all duration-[2000ms] ease-in-out`}
      />

      {/* Noise Texture Overlay for grain - Hardware accelerated to prevent repaint artifacts */}
      <div className="absolute inset-0 opacity-[0.03] transform-gpu" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Animated Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* Orb 1: Top Left */}
        <div 
          className={`absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full mix-blend-screen blur-[100px] opacity-40 animate-pulse ${orbs[0]} transition-colors duration-[2000ms] ${animDuration}`}
        />
        
        {/* Orb 2: Bottom Right */}
        <div 
          className={`absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full mix-blend-screen blur-[120px] opacity-30 animate-pulse delay-1000 ${orbs[1]} transition-colors duration-[2000ms] ${animDuration}`}
        />

        {/* Orb 3: Center/Moving */}
        <div 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full mix-blend-overlay blur-[150px] opacity-20 ${orbs[2]} transition-colors duration-[2000ms] animate-pulse ${animDuration}`}
        />
      </div>
    </div>
  );
};

export default Background;