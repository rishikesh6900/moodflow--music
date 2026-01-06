const express = require('express');
const router = express.Router();
const llmService = require('../services/llm.service');
const musicService = require('../services/music.service');

router.get('/:mood', async (req, res) => {
  const { mood } = req.params;

  try {
    // 1. Ask Gemini for the Vibe (Intent)
    const musicIntent = await llmService.analyzeMood(mood);
    console.log("🧠 AV Intent:", musicIntent);

    // 2. Fetch Real Tracks matching that Intent
    const tracks = await musicService.fetchTracks(musicIntent);

    // 3. Return to Frontend
    res.json({
      mood: mood,
      intent: musicIntent,
      tracks: tracks
    });

  } catch (error) {
    console.error("Route Error:", error);
    res.status(500).json({ error: "Failed to generate playlist" });
  }
});

module.exports = router;