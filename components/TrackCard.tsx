import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Track, MoodTheme } from '../types';

interface TrackCardProps {
  track: Track;
  theme: MoodTheme;
  isActive: boolean;
}

const TrackCard: React.FC<TrackCardProps> = ({ track, theme, isActive }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); 
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio object once
  useEffect(() => {
    if (track.previewUrl) {
      audioRef.current = new Audio(track.previewUrl);
      audioRef.current.volume = 0.5;
      
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setProgress(0);
      };

      audioRef.current.ontimeupdate = () => {
        if (audioRef.current) {
          const duration = audioRef.current.duration || 30; // Default 30s preview
          setProgress((audioRef.current.currentTime / duration) * 100);
        }
      };
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [track.previewUrl]);

  // Handle Play/Pause logic
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => console.log("Playback prevented:", error));
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (!track.previewUrl) return; // Prevent playing if no audio
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className={`relative group w-full max-w-4xl mx-auto mb-6 p-4 rounded-3xl backdrop-blur-md border border-white/10 bg-black/20 transition-all duration-500 hover:bg-black/40 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      style={{ transitionDelay: `${Math.random() * 300}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Album Art with Dynamic Glow */}
        <div className="relative shrink-0">
          <div className={`absolute inset-0 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-700 ${theme.secondary}`}></div>
          <img 
            src={track.coverUrl} 
            alt={track.title} 
            className={`relative w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover shadow-2xl transition-transform duration-500 ${isPlaying ? 'scale-105' : 'scale-100'}`}
          />
          {/* Overlay Play Icon on Image */}
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="text-white fill-white" size={32} /> : <Play className="text-white fill-white" size={32} />}
          </div>
        </div>

        {/* Track Info & Controls */}
        <div className="flex-1 w-full flex flex-col justify-center">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{track.title}</h3>
              <p className="text-white/60 text-sm md:text-base">{track.artist}</p>
            </div>
            {/* Visualizer bars (mock) */}
            <div className="flex items-end gap-1 h-6">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className={`w-1 rounded-full ${theme.secondary} transition-all duration-300`}
                  style={{ 
                    height: isPlaying ? `${Math.random() * 100}%` : '20%',
                    opacity: isPlaying ? 1 : 0.3
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full mt-4">
            <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer group/progress">
              <div 
                className={`absolute top-0 left-0 h-full ${theme.secondary} transition-all duration-300`} 
                style={{ width: `${progress}%` }}
              >
                {/* Glowing Tip */}
                <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 ${theme.secondary} rounded-full blur-[2px] shadow-[0_0_10px_currentColor]`}></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-white/40 mt-1 font-mono">
              <span>{Math.floor((progress / 100) * 200)}:{(Math.floor((progress/100)*200)%60).toString().padStart(2,'0')}</span>
              <span>{track.duration}</span>
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <button className="text-white/40 hover:text-white transition-colors"><SkipBack size={20} /></button>
              <button 
                onClick={togglePlay}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${theme.secondary} text-white shadow-lg ${theme.glowColor} hover:scale-110 transition-all duration-300`}
              >
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1"/>}
              </button>
              <button className="text-white/40 hover:text-white transition-colors"><SkipForward size={20} /></button>
            </div>
            
            <div className="flex items-center gap-2 text-white/40 group/vol">
              <Volume2 size={16} />
              <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full w-2/3 ${theme.secondary} group-hover/vol:w-full transition-all duration-300`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;