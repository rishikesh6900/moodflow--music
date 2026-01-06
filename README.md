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
- Uses **Google Gemini (REST v1)** to analyze moods (Happy, Sad, Calm, Angry)
- Generates a dynamic **Musical Intent** (energy, tempo, genres, keywords)
- Designed to **avoid repetition** via randomized intent variation

### 🎧 Real Audio Previews
- Fetches **real song metadata and 30-second previews**
- Powered by the **iTunes Search API**
- High-resolution album artwork (up to **600×600**)

### ▶️ Custom Audio Player
- Built using **HTML5 Audio**
- Play / Pause, Seek, Volume controls
- Real-time progress visualization
- **Single audio source of truth** (no overlapping playback)

### 🛡️ Robust Fallback System
- Graceful degradation when AI or APIs fail
- Offline intent logic ensures music always loads

---

## 🧠 Architecture Overview

```text
User selects mood
        ↓
Gemini AI → Musical Intent
        ↓
iTunes Search API → Songs + Covers + Previews
        ↓
React Audio Player → UI + Playback
```

---

## 🛠️ Tech Stack

### Frontend
- React 18 (Vite)
- TypeScript
- Tailwind CSS
- HTML5 Audio API
- Lucide React

### Backend
- Node.js
- Express.js
- Google Gemini API (REST v1)
- iTunes Search API
- Native Fetch API

---

## 📥 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/moodflow-music.git
cd moodflow-music
```

### 2️⃣ Backend setup
```bash
cd backend
npm install
```

Create a `.env.local` file in the **root directory**:

```env
GEMINI_API_KEY=your_google_api_key_here
PORT=5000
```

### 3️⃣ Frontend setup
```bash
cd ../frontend
npm install
```

---

## ▶️ Running the App

### Terminal 1 — Backend
```bash
cd backend
npm start
```

Expected output:
```
🎵 MoodFlow Backend is ONLINE
```

### Terminal 2 — Frontend
```bash
cd frontend
npm run dev
```

Open in browser:
```
http://localhost:5173
```

---

## 📁 Project Structure

```text
root/
├── .env.local
├── backend/
│   ├── services/
│   │   ├── llm.service.js
│   │   ├── music.service.js
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.tsx
│   │   ├── types.ts
│   └── vite.config.ts
```

---

## ⚠️ Known Limitations
- Gemini free tier has rate limits
- Some tracks may not have preview audio
- Full song playback requires licensed providers (future work)

---

## 🤝 Contributing

```bash
git checkout -b feature/AmazingFeature
git commit -m "Add AmazingFeature"
git push origin feature/AmazingFeature
```

---

## 📄 License

Distributed under the **MIT License**.

---

## ⭐ Final Note

MoodFlow is designed like a **real production system**:
- AI is best-effort, not a single point of failure
- Backend and frontend are cleanly separated
- Works with or without AI

Perfect for:
- Hackathons
- Portfolio projects
- AI + Web demos



