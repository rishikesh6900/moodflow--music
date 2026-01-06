import React, { useState } from 'react';
import { MoodType, MoodTheme, Track } from './types';
import { MOOD_THEMES } from './constants';
import Background from './components/Background';
import MoodSelector from './components/MoodSelector';
import TrackCard from './components/TrackCard';
import IntroAnimation from './components/IntroAnimation'; // Import the new intro
import { Sparkles, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [activeMood, setActiveMood] = useState<MoodType | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showIntro, setShowIntro] = useState(true); // Control intro visibility

  const handleMoodSelect = async (mood: MoodType) => {
    setActiveMood(mood);
    setIsLoading(true);
    setError(null);
    setTracks([]);
    try {
      const response = await fetch(`http://localhost:5000/api/mood/${mood.toLowerCase()}`);
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      const data = await response.json();
      
      if (data.tracks && Array.isArray(data.tracks) && data.tracks.length > 0) {
        setTracks(data.tracks);
      } else {
        setError("AI could not generate songs for this mood. Please try again.");
      }
    } catch (err) {
      console.error("Failed to fetch music:", err);
      setError("Failed to connect to backend. Is 'npm start' running in /backend?");
    } finally {
      setIsLoading(false);
    }
  };

  const currentTheme: MoodTheme | null = activeMood ? MOOD_THEMES[activeMood] : null;

  return (
    <>
      {/* Intro Animation Layer */}
      {showIntro && (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      )}

      {/* Main App Content - Fades in after intro */}
      <div 
        className={`min-h-screen w-full relative transition-all duration-1000 
          ${showIntro ? 'opacity-0 scale-95 h-screen overflow-hidden' : 'opacity-100 scale-100'}
        `}
      >
        
        {/* Dynamic Background */}
        <Background theme={currentTheme} mood={activeMood} />

        {/* Main Content Layer */}
        <div className="relative z-10 min-h-screen flex flex-col px-4 md:px-8 max-w-7xl mx-auto">
          
          {/* Header / Brand */}
          <header className="py-8 flex justify-between items-center">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setActiveMood(null)}>
              <div className={`p-2 rounded-xl transition-all duration-700 ${currentTheme ? currentTheme.secondary : 'bg-white/10'}`}>
                <Activity className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold tracking-tighter text-white">
                Mood<span className={`transition-colors duration-700 ${currentTheme ? currentTheme.primary : 'text-gray-400'}`}>Flow</span>
              </h1>
            </div>
            
            <div className="hidden md:flex items-center gap-4 text-sm font-medium text-white/50">
              <span>Premium Sound</span>
              <div className="w-px h-4 bg-white/20"></div>
              <span>v2.0.4</span>
            </div>
          </header>

          {/* Hero Section - Conditional Rendering based on state */}
          <div className={`flex-1 flex flex-col items-center justify-start pt-10 md:pt-20 transition-all duration-700 ${activeMood ? 'translate-y-0' : 'translate-y-20'}`}>
            
            {/* Main Title */}
            <h2 className={`text-4xl md:text-7xl font-extrabold text-center mb-6 transition-all duration-700 ${activeMood ? 'scale-75 opacity-80' : 'scale-100'}`}>
              <span className="block text-white mb-2">How are you</span>
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${currentTheme ? `from-white via-white ${currentTheme.primary.replace('text', 'to')}` : 'from-white via-gray-300 to-gray-500'}`}>
                feeling today?
              </span>
            </h2>

            {/* Subtitle / Description */}
            <p className={`text-center text-lg md:text-xl text-white/60 max-w-lg mb-12 h-8 transition-all duration-500 ${activeMood ? 'opacity-100' : 'opacity-0'}`}>
              {currentTheme ? currentTheme.description : ''}
            </p>

            {/* Sticky Mood Selector */}
            <div className={`sticky top-4 z-40 transition-all duration-500 ${activeMood ? 'mb-10' : 'mb-20'}`}>
              <div className="backdrop-blur-md bg-black/30 rounded-full p-2 border border-white/5 shadow-2xl">
                <MoodSelector 
                  currentMood={activeMood} 
                  onSelectMood={handleMoodSelect} 
                  themes={MOOD_THEMES} 
                />
              </div>
            </div>

            {/* Track List - Animate In */}
            <div className={`w-full max-w-4xl transition-all duration-1000 ease-out pb-20 ${activeMood ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}>
              
              {isLoading ? (
                 <div className="flex flex-col items-center justify-center py-20">
                    <Sparkles size={48} className={`text-white animate-spin ${currentTheme ? currentTheme.secondary : ''}`} />
                    <p className="text-white/50 mt-4 animate-pulse">Curating your vibe...</p>
                 </div>
              ) : error ? (
                <div className="text-center py-10 bg-red-500/20 rounded-xl border border-red-500/50">
                  <p className="text-white font-bold mb-2">Unavailable</p>
                  <p className="text-white/70 text-sm">{error}</p>
                </div>
              ) : (
                tracks.map((track) => (
                  <TrackCard 
                    key={track.id} 
                    track={track} 
                    theme={currentTheme!} 
                    isActive={!!activeMood}
                  />
                ))
              )}
              
              {/* Empty State / Prompt if no mood selected */}
              {!activeMood && (
                <div className="flex flex-col items-center justify-center opacity-30 mt-20">
                  <Sparkles size={48} className="text-white mb-4 animate-pulse" />
                  <p>Select a mood to begin your journey</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default App;