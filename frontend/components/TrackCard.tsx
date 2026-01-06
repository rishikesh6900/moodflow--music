import React, {  } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Track, MoodTheme } from '../types';

interface TrackCardProps {
  track: Track;
  theme: MoodTheme;
  isActive: boolean; // Animation state (visible or not)
  
  // Audio State & Controls
  isCurrentTrack: boolean;
  isPlaying: boolean;
  currentTime: number; // Current playback time in seconds
  duration: number;    // Audio duration in seconds (from audio metadata)
  volume: number;      // 0.0 to 1.0
  
  onPlayPause: (track: Track) => void;
  onSeek: (time: number) => void;
  onVolumeChange: (volume: number) => void;
}

const TrackCard: React.FC<TrackCardProps> = ({ 
  track, 
  theme, 
  isActive, 
  isCurrentTrack, 
  isPlaying, 
  currentTime, 
  duration,
  volume,
  onPlayPause,
  onSeek,
  onVolumeChange
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  // Helper to format seconds into MM:SS
  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // If this card is playing, use real real-time data. Otherwise default to 0.
  const currentProgress = isCurrentTrack ? (currentTime / (duration || 1)) * 100 : 0;
  const displayTime = isCurrentTrack ? formatTime(currentTime) : "0:00";
  // Use track.duration string for total if not playing, otherwise real duration
  const displayDuration = isCurrentTrack && duration ? formatTime(duration) : track.duration;

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isCurrentTrack) {
        const newTime = (parseFloat(e.target.value) / 100) * (duration || 30);
        onSeek(newTime);
    }
  };

  const handlePlayClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onPlayPause(track);
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
            className={`relative w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover shadow-2xl transition-transform duration-500 ${isCurrentTrack && isPlaying ? 'scale-105' : 'scale-100'}`}
          />
          {/* Overlay Play Icon on Image */}
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={handlePlayClick}
          >
             {isCurrentTrack && isPlaying ? (
               <Pause className="text-white fill-white" size={32} />
             ) : (
               <Play className="text-white fill-white" size={32} />
             )}
          </div>
        </div>

        {/* Track Info & Controls */}
        <div className="flex-1 w-full flex flex-col justify-center">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{track.title}</h3>
              <p className="text-white/60 text-sm md:text-base">{track.artist}</p>
            </div>
            {/* Visualizer bars (Active only when playing) */}
            <div className="flex items-end gap-1 h-6">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className={`w-1 rounded-full ${theme.secondary} transition-all duration-300`}
                  style={{ 
                    height: isCurrentTrack && isPlaying ? `${Math.random() * 100}%` : '20%',
                    opacity: isCurrentTrack && isPlaying ? 1 : 0.3
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* Progress Bar (Interactive) */}
          <div className="w-full mt-4 group/progress">
            <input 
                type="range" 
                min="0" 
                max="100" 
                value={currentProgress || 0}
                onChange={handleSeekChange}
                disabled={!isCurrentTrack}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-0 [&::-webkit-slider-thumb]:h-0 [&:hover::-webkit-slider-thumb]:w-3 [&:hover::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white transition-all"
            />
            {/* Custom styled track overlay for color */}
             <div 
                className={`absolute pointer-events-none h-1.5 ${theme.secondary} rounded-full top-[52px] md:top-[68px] mix-blend-screen transition-all duration-75`}
                style={{ width: `${currentProgress}%`, opacity: 0.8 }}
             ></div> 

            <div className="flex justify-between text-xs text-white/40 mt-1 font-mono">
              <span>{displayTime}</span>
              <span>{displayDuration}</span>
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-4">
              <button className="text-white/40 hover:text-white transition-colors"><SkipBack size={20} /></button>
              <button 
                onClick={handlePlayClick}
                disabled={!track.previewUrl}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${theme.secondary} text-white shadow-lg ${theme.glowColor} transition-all duration-300 ${(!track.previewUrl) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
              >
                {isCurrentTrack && isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1"/>}
              </button>
              <button className="text-white/40 hover:text-white transition-colors"><SkipForward size={20} /></button>
            </div>
            
            {/* Volume Control */}
            <div className="flex items-center gap-2 text-white/40 group/vol relative">
              <Volume2 size={16} />
              <input 
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="w-20 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;