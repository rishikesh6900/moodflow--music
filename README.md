🎵 MoodFlow — AI-Powered Mood-Based Music Player

MoodFlow is a full-stack web application that generates dynamic, non-repetitive playlists based on a user’s emotional state. Powered by Google Gemini AI, it acts as an intelligent DJ that understands abstract moods and curates real, playable music previews using the iTunes Search API.

🚧 Work in Progress
This project is under active development. Features, performance, and UX are continuously being refined.

✨ Key Features
🤖 AI-Driven Music Curation

Uses Google Gemini (REST v1) to analyze moods such as Happy, Sad, Calm, and Angry

Generates a Musical Intent (energy, tempo, genres, keywords)

Designed to avoid repetition through randomized intent variation and query diversification

🎧 Real Audio Previews

Fetches real song metadata and 30-second audio previews

Powered by the iTunes Search API (no authentication required)

High-resolution album artwork (up to 600×600)

🎨 Emotion-Driven UI

Glassmorphism-inspired design

Entire UI adapts to the selected mood:

Color palette

Glow effects

Animations

Background atmosphere

▶️ Full-Featured Custom Audio Player

Built from scratch using HTML5 Audio

Features:

Play / Pause

Seek bar with real-time progress

Volume control

Track duration visualization

Single audio source of truth (prevents overlapping playback)

🛡️ Robust Fallback System

Graceful degradation when:

AI quota is exhausted

APIs are unavailable

Automatically falls back to offline intent logic

Music never stops, even without AI

🧠 Architecture Overview
User Mood Selection
        ↓
Gemini AI → Musical Intent (genres, energy, tempo)
        ↓
iTunes Search API → Songs + Covers + Previews
        ↓
React Audio Player → UI + Playback


Gemini influences direction, not specific song choices — ensuring variety and scalability.

🛠️ Tech Stack
Frontend

React 18 (Vite) — Fast, modern UI

TypeScript — Strong typing and maintainability

Tailwind CSS — Utility-first styling for complex animations

Lucide React — High-quality SVG icons

Backend

Node.js & Express — Lightweight REST API

Google Gemini API (REST v1) — AI-based mood analysis

iTunes Search API — Song metadata, artwork, and previews

Native Fetch API — No unnecessary HTTP dependencies

🚀 Getting Started
Prerequisites

Node.js v16 or higher

Google Cloud API Key (Gemini access enabled)

Installation
1️⃣ Clone the Repository
git clone https://github.com/yourusername/moodflow-music.git
cd moodflow-music

2️⃣ Backend Setup
cd backend
npm install


Create a .env.local file in the root directory (not inside backend):

GEMINI_API_KEY=your_actual_google_api_key
PORT=5000

3️⃣ Frontend Setup
cd ../frontend
npm install

▶️ Running the Application

Run backend and frontend simultaneously.

Terminal 1 — Backend
cd backend
npm start


Expected output:

🎵 MoodFlow Backend is ONLINE

Terminal 2 — Frontend
cd frontend
npm run dev


Open your browser at:

http://localhost:5173

📁 Project Structure
root/
├── .env.local              # Environment variables (not committed)
├── backend/
│   ├── services/
│   │   ├── llm.service.js  # Gemini AI integration
│   │   └── music.service.js # iTunes API + fallback logic
│   ├── routes/             # API endpoints
│   └── server.js           # Express entry point
├── frontend/
│   ├── src/
│   │   ├── components/     # TrackCard, MoodSelector, Player
│   │   ├── App.tsx         # Global audio state manager
│   │   └── types.ts        # TypeScript interfaces
│   └── vite.config.ts

🤝 Contributing

Contributions are welcome and encouraged.

Fork the project

Create a feature branch:

git checkout -b feature/AmazingFeature


Commit your changes:

git commit -m "Add AmazingFeature"


Push to the branch:

git push origin feature/AmazingFeature


Open a Pull Request

📄 License

Distributed under the MIT License.
See LICENSE for more information.
