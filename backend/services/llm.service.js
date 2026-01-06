const apiKey = process.env.GEMINI_API_KEY;

/**
 * Uses Gemini REST API (v1) to extract musical parameters from a mood.
 * Returns { energy, tempo, genres, keywords } or null on failure.
 * 
 * NO SDK. NO v1beta.
 */
async function analyzeMood(mood) {
  if (!apiKey) {
    console.warn("⚠️ No Gemini API key. Skipping LLM.");
    return null;
  }

  // MANDATORY: Use REST API v1
  const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  // Add randomness to prevent caching and repetition
  const seed = Math.floor(Math.random() * 100000);
  
  const prompt = `
    You are a creative music curator.
    Analyze the mood: "${mood}".
    GENERATE A UNIQUE MUSIC INTENT.
    Do NOT suggest specific songs.
    
    Random Seed: ${seed} (Use this to vary your answer from previous requests)

    Output Contract (JSON ONLY):
    {
      "energy": "low" | "medium" | "high",
      "tempo": "slow" | "medium" | "fast",
      "genres": ["string", "string"],  // specific, niche genres
      "keywords": ["string", "string"], // visual or emotional keywords
      "era": "string", // e.g. "80s", "2010s", "modern", "jazz age"
      "mood_variation": "string" // e.g. "melancholic but hopeful", "aggressive workout"
    }
  `;

  // Simple retry mechanism for transient 503 errors
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      console.log(`🤖 REST Request to Gemini (2.5-flash) for mood: ${mood} (Attempt ${attempt})`);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });

      // Handle 503 Service Unavailable (Overload)
      if (response.status === 503) {
        if (attempt === 1) {
          console.warn("⚠️ Gemini 503 Overload. Retrying in 500ms...");
          await new Promise(resolve => setTimeout(resolve, 500));
          continue;
        } else {
          console.error("❌ Gemini 503 Persistent Failure.");
          return null;
        }
      }

      if (!response.ok) {
          const errText = await response.text();
          console.error(`❌ Gemini API Error (${response.status}):`, errText);
          return null; // Safe fallback
      }

      const data = await response.json();
      
      // Safety check for response structure
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
          console.warn("⚠️ Gemini returned unexpected structure:", JSON.stringify(data).substring(0, 100));
          return null;
      }

      let text = data.candidates[0].content.parts[0].text;

      // Sanitize MarkDown
      text = text.replace(/```json/g, '').replace(/```/g, '').trim();

      const intent = JSON.parse(text);
      return intent;

    } catch (error) {
      console.error(`❌ LLM Service Error (Attempt ${attempt}):`, error.message);
      // Retry connection errors once
      if (attempt === 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
        continue;
      }
      return null;
    }
  }
  return null;
}

module.exports = { analyzeMood };

