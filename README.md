# 🎵 MoodFlow
### AI-Powered Mood-Based Music Player

> **MoodFlow** is a full-stack web application that generates  
> 🎧 **dynamic, non-repetitive music playlists** based on your emotional state.  
> Powered by **Google Gemini AI** and **real audio previews**, it behaves like an  
> intelligent DJ that understands how you feel.

![Status](https://img.shields.io/badge/status-active%20development-blue)
![Frontend](https://img.shields.io/badge/frontend-React%2018-blue)
![Backend](https://img.shields.io/badge/backend-Node.js-green)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## ✨ Features

### 🤖 AI-Driven Music Curation
- Uses **Google Gemini (REST v1)** to analyze moods:
  - 😊 Happy
  - 😢 Sad
  - 😌 Calm
  - 😠 Angry
- Generates a dynamic **Musical Intent**:
  - Energy
  - Tempo
  - Genres
  - Keywords
- Built to **avoid repetition** via randomized intent variation

### 🎧 Real Audio Previews
- Fetches **real song metadata and 30-second audio previews**
- Powered by the **iTunes Search API**
- High-resolution album artwork (up to **600×600**)

### 🎨 Emotion-Driven UI
- Glassmorphism-inspired design
- Entire UI adapts to the selected mood:
  - Background gradients
  - Accent colors
  - Glow effects
  - Animation speed & intensity

### ▶️ Custom Audio Player
- Built from scratch using **HTML5 Audio**
- Features:
  - Play / Pause
  - Seek bar with real-time progress
  - Volume control
  - Duration display
- **Single audio source of truth**
  - No overlapping playback
  - Clean state management

### 🛡️ Robust Fallback System
- Graceful degradation when:
  - Gemini quota is exhausted
  - External APIs fail
- Automatically falls back to offline intent logic
- **The app never breaks — music always loads**

---

## 🧠 Architecture Overview


