const path = require('path');
// Load .env.local from the root directory (parent of backend)
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const express = require('express');
const cors = require('cors');
const moodRoutes = require('./routes/mood.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Debug: Verify API Key is loaded
if (process.env.GEMINI_API_KEY) {
  console.log("✅ API Key loaded: " + process.env.GEMINI_API_KEY.substring(0, 5) + "...");
} else {
  console.error("❌ FATAL: GEMINI_API_KEY is NOT loaded. Check .env.local path.");
}

// Middleware
app.use(cors()); // Enable CORS for frontend integration
app.use(express.json());

// === NEW HEALTH CHECK ROUTE ===
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'online', 
        message: 'Backend is running!',
        keyLoaded: !!process.env.GEMINI_API_KEY 
    });
});

// Routes
app.use('/api/mood', moodRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on the server.'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`
  🎵 MoodFlow Backend is running!
  -------------------------------------
  URL:    http://localhost:${PORT}
  Route:  http://localhost:${PORT}/api/mood/:mood
  -------------------------------------
  `);
});