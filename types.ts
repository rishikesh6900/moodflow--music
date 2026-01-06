import React from 'react';

export enum MoodType {
  Happy = 'HAPPY',
  Sad = 'SAD',
  Calm = 'CALM',
  Angry = 'ANGRY'
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  coverUrl: string;
  previewUrl?: string; // Add this field for the player
}

export interface MoodTheme {
  primary: string; // Main accent color (text-*, bg-*)
  secondary: string;
  backgroundGradient: string; // CSS gradient class
  orbColors: [string, string, string]; // Colors for background orbs
  icon: React.ReactNode;
  description: string;
  animationSpeed: string; // Tailwind duration class
  glowColor: string; // For box shadows
}

export type ThemeMap = Record<MoodType, MoodTheme>;