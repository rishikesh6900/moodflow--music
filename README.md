#  MoodFlow - AI-Powered Mood Music Player

MoodFlow is a full-stack web application that generates unique, dynamic playlists based on your current emotional state. Powered by **Google Gemini AI**, it acts as an intelligent DJ that understands abstract moods and curates playable music from the **iTunes Search API**.

>  **Work in Progress**: This project is currently under active development. Features are being refined and expanded daily.

![Tech Stack](https://img.shields.io/badge/stack-MERN%20%2B%20Vite-blue) ![Status](https://img.shields.io/badge/status-active--development-orange)

##  Features

- ** AI-Driven Curation**: Uses **Gemini 1.5 Flash/Pro** to analyze moods (Happy, Sad, Calm, Angry) and generate a unique "Musical Intent" (Genre, Tempo, Energy) every time. Never gets repetitive.
- ** Real Audio Previews**: Fetches real song metadata and 30-second audio previews using the **iTunes Search API**.
- ** Dynamic UI**: A beautiful, glassmorphism-inspired interface with mood-based theming (colors, animations, and glows change based on selection).
- ** Full-Featured Player**:
  - Custom-built React Audio Player.
  - Play/Pause, Seek, and Volume controls.
  - Real-time progress visualization.
  - Single-source-of-truth audio engine (no overlapping tracks).
- ** Robust Fallback System**: If AI or APIs fail, the system degrades gracefully to offline backup tracks—the music never stops.

##  Tech Stack

### Frontend
- **React 18** (Vite) - Blazing fast UI updates.
- **TypeScript** - Strict typing for robust code quality.
- **Tailwind CSS** - Utility-first styling for complex animations and gradients.
- **Lucide React** - High-quality, customizable SVG icons.

### Backend
- **Node.js & Express** - Lightweight, scalable REST API.
- **Google Gemini API** (REST v1) - Generative AI for musical intent analysis.
- **iTunes Search API** - Massive database for song discovery and artwork (600x600).
- **Fetch API** - Standardized HTTP requests without external dependencies.

##  Getting Started

### Prerequisites
- Node.js (v16 or higher)
- A Google Cloud API Key (for Gemini)

### Installation

1. **Clone the repository**
   \\\ash
   git clone https://github.com/yourusername/moodflow-music.git
   cd moodflow-music
   \\\`n
2. **Setup Backend**
   \\\ash
   cd backend
   npm install
   \\\`n   *Create a \.env.local\ file in the root directory (outside backend):*
   \\\env
   GEMINI_API_KEY=your_actual_google_api_key
   PORT=5000
   \\\`n
3. **Setup Frontend**
   \\\ash
   cd ../frontend
   npm install
   \\\`n
### Running the App

You need to run the backend and frontend simultaneously.

**Terminal 1 (Backend):**
\\\ash
cd backend
npm start
\\\`n*Output: \ MoodFlow Backend is ONLINE\*

**Terminal 2 (Frontend):**
\\\ash
cd frontend
npm run dev
\\\`n*Open your browser to \http://localhost:5173\ (or the port shown).*

##  Project Structure

\\\`nroot/
 .env.local             # API Keys (Not committed)
 backend/
    services/
       llm.service.js   # Gemini AI integration logic
       music.service.js # iTunes API & Fallback logic
    routes/              # API Endpoints
    server.js            # Express Entry point
 frontend/
     src/
        components/      # TrackCard, MoodSelector, etc.
        App.tsx          # Main Audio State Manager
        types.ts         # TypeScript Interfaces
     vite.config.ts
\\\`n
##  Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements.

1. Fork the Project
2. Create your Feature Branch (\git checkout -b feature/AmazingFeature\)
3. Commit your Changes (\git commit -m 'Add some AmazingFeature'\)
4. Push to the Branch (\git push origin feature/AmazingFeature\)
5. Open a Pull Request

##  License

Distributed under the MIT License.
