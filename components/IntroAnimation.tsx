import React, { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'initial' | 'build' | 'overload' | 'flash' | 'done'>('initial');

  useEffect(() => {
    // Timeline of the animation
    const timeline = [
      { t: 500, fn: () => setPhase('build') },      // Text reveals
      { t: 3000, fn: () => setPhase('overload') },  // Color cycle begins (Music drop)
      { t: 4500, fn: () => setPhase('flash') },     // White flash
      { t: 4800, fn: () => {                        // Finish
          setPhase('done');
          onComplete();
        } 
      }
    ];

    const timers = timeline.map(item => setTimeout(item.fn, item.t));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-colors duration-300 select-none cursor-wait
      ${phase === 'initial' ? 'bg-black' : ''}
      ${phase === 'build' ? 'bg-black' : ''}
      ${phase === 'overload' ? 'animate-mood-overload' : ''}
      ${phase === 'flash' ? 'bg-white' : ''}
    `}>
      {/* Content Container */}
      <div className={`relative flex flex-col items-center justify-center transition-opacity duration-200 ${phase === 'flash' ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Animated Rings (Only visible during overload) */}
        {phase === 'overload' && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] rounded-full border-[50px] border-white/10 animate-ping duration-700"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] rounded-full border-[20px] border-white/20 animate-ping delay-100 duration-500"></div>
          </div>
        )}

        {/* Logo Icon */}
        <div className={`
          mb-6 transform transition-all duration-1000
          ${phase === 'initial' ? 'scale-0 opacity-0 rotate-180' : 'scale-100 opacity-100 rotate-0'}
          ${phase === 'overload' ? 'animate-glitch scale-150 text-white' : 'text-white'}
        `}>
          <Activity size={64} strokeWidth={1} />
        </div>

        {/* Main Text */}
        <h1 className={`
          text-6xl md:text-9xl font-extrabold text-white tracking-tighter uppercase
          ${phase === 'initial' ? 'opacity-0' : 'animate-letter-reveal'}
          ${phase === 'overload' ? 'text-black mix-blend-difference' : ''}
        `}>
          MoodFlow
        </h1>

        {/* Subtext */}
        <div className={`
          mt-4 overflow-hidden h-8 flex items-center justify-center
          transition-all duration-1000 delay-1000
          ${phase === 'initial' ? 'opacity-0 translate-y-4' : 'opacity-60 translate-y-0'}
          ${phase === 'overload' ? 'opacity-0' : ''}
        `}>
          <p className="text-sm md:text-xl font-light tracking-[0.5em] text-white">
            FEEL THE RHYTHM
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;