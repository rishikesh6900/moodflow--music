const { GoogleGenerativeAI } = require("@google/generative-ai");

// Validate API Key immediately on load
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("❌ CRITICAL: GEMINI_API_KEY is undefined in environment!");
}

// Initialize Gemini
const genAI = new GoogleGenerativeAI(apiKey);

const getRecommendations = async (mood) => {
  try {
    console.log(`🤖 Requesting songs for mood: ${mood}`);
    
    // Use gemini-1.5-flash which is faster and better at structured JSON
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" } // Force JSON mode
    });

    const prompt = `
      You are a music recommendation engine.
      Generate a playlist of 8 songs for a "${mood}" mood.
      
      Requirements:
      1. Return ONLY a JSON array.
      2. No markdown formatting.
      3. No text explanations.
      4. Schema: [{"title": "Song Name", "artist": "Artist Name", "duration": "MM:SS"}]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    console.log("🤖 Raw AI response length:", text.length);

    // Strict cleanup to ensure valid JSON
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

    const songs = JSON.parse(text);

    // Map to the format the Frontend (TrackCard) expects
    return songs.map((song, index) => ({
      id: `gemini-${Date.now()}-${index}`,
      title: song.title,
      artist: song.artist,
      duration: song.duration || "3:00",
      // Using a placeholder service that generates nice gradients/text
      coverUrl: `https://placehold.co/400x400/1a1a1a/FFF?text=${encodeURIComponent(song.artist)}`,
      previewUrl: null 
    }));

  } catch (error) {
    console.error("❌ AI GENERATION FAILED:", error.message);
    
    // FALLBACK: Return a dummy list so the UI NEVER shows an error to the user
    // This satisfies "I just want the list to come in front"
    return [
        { id: 'err-1', title: `Mood: ${mood}`, artist: "AI Generation Failed", duration: "0:00", coverUrl: "https://placehold.co/400?text=Error" },
        { id: 'err-2', title: "Try Restarting Backend", artist: "System", duration: "0:00", coverUrl: "https://placehold.co/400?text=System" },
    ];
  }
};

module.exports = {
  getRecommendations
};
