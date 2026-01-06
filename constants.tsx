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

export const MOCK_TRACKS: Record<MoodType, Track[]> = {
  [MoodType.Happy]: [
    { id: 'h1', title: 'Golden Hour Drive', artist: 'Solar Beats', duration: '3:12', coverUrl: 'https://picsum.photos/seed/happy1/200/200' },
    { id: 'h2', title: 'Neon Bounce', artist: 'The Upbeats', duration: '2:45', coverUrl: 'https://picsum.photos/seed/happy2/200/200' },
    { id: 'h3', title: 'Summer Breeze', artist: 'Coastline', duration: '3:30', coverUrl: 'https://picsum.photos/seed/happy3/200/200' },
    { id: 'h4', title: 'Electric Joy', artist: 'Synthwave City', duration: '4:01', coverUrl: 'https://picsum.photos/seed/happy4/200/200' },
  ],
  [MoodType.Sad]: [
    { id: 's1', title: 'Midnight Rain', artist: 'Echoes of Blue', duration: '4:20', coverUrl: 'https://picsum.photos/seed/sad1/200/200' },
    { id: 's2', title: 'Lost In Thought', artist: 'Melancholia', duration: '3:55', coverUrl: 'https://picsum.photos/seed/sad2/200/200' },
    { id: 's3', title: 'Fading Memories', artist: 'The Void', duration: '5:10', coverUrl: 'https://picsum.photos/seed/sad3/200/200' },
    { id: 's4', title: 'Grey Skies', artist: 'November', duration: '3:40', coverUrl: 'https://picsum.photos/seed/sad4/200/200' },
  ],
  [MoodType.Calm]: [
    { id: 'c1', title: 'Morning Dew', artist: 'Nature Sounds', duration: '6:15', coverUrl: 'https://picsum.photos/seed/calm1/200/200' },
    { id: 'c2', title: 'Floating Leaves', artist: 'Zen Garden', duration: '4:45', coverUrl: 'https://picsum.photos/seed/calm2/200/200' },
    { id: 'c3', title: 'Deep Ocean', artist: 'Aqua Ambience', duration: '5:30', coverUrl: 'https://picsum.photos/seed/calm3/200/200' },
    { id: 'c4', title: 'Wind Chimes', artist: 'Aether', duration: '3:25', coverUrl: 'https://picsum.photos/seed/calm4/200/200' },
  ],
  [MoodType.Angry]: [
    { id: 'a1', title: 'Riot Protocol', artist: 'Distortion K', duration: '2:50', coverUrl: 'https://picsum.photos/seed/angry1/200/200' },
    { id: 'a2', title: 'Breaking Point', artist: 'Heavy Metal Core', duration: '3:15', coverUrl: 'https://picsum.photos/seed/angry2/200/200' },
    { id: 'a3', title: 'Red Zone', artist: 'Adrenaline Junkies', duration: '2:30', coverUrl: 'https://picsum.photos/seed/angry3/200/200' },
    { id: 'a4', title: 'System Failure', artist: 'Glitch Mob', duration: '3:45', coverUrl: 'https://picsum.photos/seed/angry4/200/200' },
  ],
};