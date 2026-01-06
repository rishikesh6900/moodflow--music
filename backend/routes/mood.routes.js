const express = require('express');
const router = express.Router();
const llmService = require('../services/llm.service');
const musicService = require('../services/music.service');
const { getFallbackIntent } = require('../utils/fallbackIntent');

router.get('/:mood', async (req, res) => {
  const { mood } = req.params;

  try {
    // 1. Get Intent (Gemini -> Fallback)
    // analyzeMood is guaranteed to return null on ANY failure
    let intent = await llmService.analyzeMood(mood);
    
    // Safety Net: If Gemini fails, use hardcoded intent
    if (!intent) {
      console.warn("⚠️ Gemini unavailable or failed. Using fallback intent.");
      intent = getFallbackIntent(mood);
    }

    console.log("🧠 Mood Intent:", JSON.stringify(intent, null, 2));

    // 2. Fetch Tracks 
    // Passing empty array [] forces musicService to use BACKUP_TRACKS 
    // This is a temporary bridge until MusicService supports Intent input
    const tracks = await musicService.fetchTracks([]);

    // 3. Return to Frontend
    res.json({
      mood,
      intent, // Sending intent for frontend animations/context
      tracks
    });

  } catch (error) {
    console.error("❌ Route Critical Failure:", error.message);
    // Absolute failsafe
    res.status(200).json({ 
      mood,
      intent: getFallbackIntent(mood),
      tracks: [] // Frontend handles empty tracks gracefully
    });
  }
});

module.exports = router;