// Deterministic fallbacks if AI goes offline
const FALLBACK_INTENTS = {
  happy: {
    energy: "high",
    tempo: "fast",
    genres: ["pop", "disco", "funk"],
    keywords: ["summer", "dance", "upbeat"]
  },
  sad: {
    energy: "low",
    tempo: "slow",
    genres: ["acoustic", "piano", "indie-folk"],
    keywords: ["melancholy", "rain", "heartbreak"]
  },
  calm: {
    energy: "low",
    tempo: "slow",
    genres: ["ambient", "lo-fi", "jazz"],
    keywords: ["relax", "nature", "study"]
  },
  angry: {
    energy: "high",
    tempo: "fast",
    genres: ["metal", "hard-rock", "punk"],
    keywords: ["intense", "workout", "power"]
  }
};

const getFallbackIntent = (mood) => {
  return FALLBACK_INTENTS[mood.toLowerCase()] || FALLBACK_INTENTS['happy'];
};

module.exports = {
  getFallbackIntent
};
