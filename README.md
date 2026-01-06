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
User selects mood
↓
Gemini AI → Musical Intent (genres, energy, tempo)
↓
iTunes Search API → Songs + Covers + Previews
↓
React Audio Player → UI + Playback


> Gemini decides **direction**, not fixed songs —  
> metadata APIs + randomness ensure fresh results every time.

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ **React 18 (Vite)** — Fast, modern UI
- 🟦 **TypeScript** — Type safety & maintainability
- 🎨 **Tailwind CSS** — Utility-first styling & animations
- 🔊 **HTML5 Audio API** — Native audio playback
- 🧩 **Lucide React** — Clean SVG icons

### Backend
- 🟢 **Node.js**
- 🚂 **Express.js** — Lightweight REST API
- 🤖 **Google Gemini API (REST v1)** — AI mood analysis
- 🎵 **iTunes Search API** — Songs, covers & previews
- 🌐 **Fetch API** — HTTP requests without extra dependencies

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js **v16 or higher**
- Google Cloud **Gemini API key**

---

### 📥 Installation

#### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/moodflow-music.git
cd moodflow-music
2️⃣ Backend setup
cd backend
npm install


Create a .env.local file in the root directory:

GEMINI_API_KEY=your_google_api_key_here
PORT=5000

3️⃣ Frontend setup
cd ../frontend
npm install

▶️ Running the App

You must run both backend and frontend.

Terminal 1 — Backend
cd backend
npm start


Expected output:

🎵 MoodFlow Backend is ONLINE

Terminal 2 — Frontend
cd frontend
npm run dev


Open in browser:

http://localhost:5173

📁 Project Structure
root/
├── .env.local                # Environment variables (not committed)
├── backend/
│   ├── services/
│   │   ├── llm.service.js    # Gemini AI integration
│   │   ├── music.service.js # iTunes API + fallback logic
│   ├── routes/               # Express API routes
│   └── server.js             # Backend entry point
├── frontend/
│   ├── src/
│   │   ├── components/       # TrackCard, MoodSelector, Player
│   │   ├── App.tsx           # Global audio state manager
│   │   ├── types.ts          # TypeScript interfaces
│   └── vite.config.ts

⚠️ Known Limitations

Gemini free tier has rate limits

Some tracks may not have preview audio

Full song playback requires licensed providers (future work)

These are handled gracefully via fallback logic.

🤝 Contributing

Contributions are welcome.

# Fork the repo
# Create a feature branch
git checkout -b feature/AmazingFeature

# Commit changes
git commit -m "Add AmazingFeature"

# Push and open a PR
git push origin feature/AmazingFeature

📄 License

Distributed under the MIT License.

⭐ Final Note

MoodFlow is designed like a real production system:

AI is best-effort, not a single point of failure

Backend and frontend are cleanly separated

System works with or without AI

Perfect for:

Hackathons

Portfolio projects

AI + Web demos


