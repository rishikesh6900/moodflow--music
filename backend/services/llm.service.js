const { GoogleGenerativeAI } = require("@google/generative-ai");
const fallbackIntent = require('../utils/fallbackIntent');

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const analyzeMood = async (mood) => {
  // If no key, fail fast to fallback
  if (!genAI) {
    console.warn("⚠️ No Gemini Key found. Using fallback.");
    return fallbackIntent.getFallbackIntent(mood);
  }

  try {
    // Use gemini-1.5-flash for speed and JSON structure
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      Analyze the mood: "${mood}".
      Return a JSON object describing the musical characteristics to search for.
      
      Schema:
      {
        "energy": "low | medium | high",
        "tempo": "slow | medium | fast",
        "genres": ["string", "string"], 
        "keywords": ["string", "string"]
      }

      Example:
      {"energy": "high", "tempo": "fast", "genres": ["pop", "disco"], "keywords": ["summer", "party"]}
    `;

    console.log(`🤖 Asking Gemini to analyze mood: ${mood}`);
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return JSON.parse(text);

  } catch (error) {
    console.error("❌ Gemini Analysis Failed:", error.message);
    return fallbackIntent.getFallbackIntent(mood);
  }
};

module.exports = {
  analyzeMood
};
