import React from 'react';
import { MoodType, ThemeMap, Track } from './types';
import { Sun, CloudRain, Wind, Flame } from 'lucide-react';

export const MOOD_THEMES: ThemeMap = {
  [MoodType.Happy]: {
    primary: 'text-yellow-400',
    secondary: 'bg-yellow-500',
    backgroundGradient: 'from-orange-400/20 via-yellow-500/10 to-amber-900/40',
    orbColors: ['bg-yellow-400', 'bg-orange-500', 'bg-amber-300'],
    icon: <Sun size={24} />,
    description: "Feel the warmth. Let the energy flow.",
    animationSpeed: 'duration-[2000ms]',
    glowColor: 'shadow-yellow-500/50',
  },
  [MoodType.Sad]: {
    primary: 'text-blue-400',
    secondary: 'bg-blue-600',
    backgroundGradient: 'from-blue-900/30 via-slate-900/50 to-indigo-950/40',
    orbColors: ['bg-blue-600', 'bg-indigo-700', 'bg-slate-500'],
    icon: <CloudRain size={24} />,
    description: "It's okay to feel. Deep tones for reflection.",
    animationSpeed: 'duration-[4000ms]',
    glowColor: 'shadow-blue-500/40',
  },
  [MoodType.Calm]: {
    primary: 'text-teal-300',
    secondary: 'bg-teal-500',
    backgroundGradient: 'from-teal-900/20 via-emerald-900/10 to-cyan-900/30',
    orbColors: ['bg-teal-400', 'bg-emerald-500', 'bg-cyan-600'],
    icon: <Wind size={24} />,
    description: "Breathe in. Breathe out. Find your center.",
    animationSpeed: 'duration-[6000ms]',
    glowColor: 'shadow-teal-500/40',
  },
  [MoodType.Angry]: {
    primary: 'text-red-500',
    secondary: 'bg-red-600',
    backgroundGradient: 'from-red-900/40 via-rose-950/50 to-black',
    orbColors: ['bg-red-600', 'bg-rose-700', 'bg-orange-700'],
    icon: <Flame size={24} />,
    description: "Release the fire. Raw power and intensity.",
    animationSpeed: 'duration-[500ms]',
    glowColor: 'shadow-red-600/60',
  }
};


export const MOCK_TRACKS = {};
