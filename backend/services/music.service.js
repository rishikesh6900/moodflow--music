// RELIABLE AUDIO POOL (iTunes Previews & FMA)
// Replaced Pixabay links (often 403 Forbidden) with public durable URLS
const DEMO_AUDIO_POOL = [
  // Happy / Upbeat
  "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/9e/2a/3b/9e2a3b94-8743-41c0-2646-cd10c554900c/mzaf_3364235216399478479.plus.aac.p.m4a",
  // Calm / Ambient
  "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3",
  // Energetic
  "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3",
  // General Pop
  "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/a4/c8/16/a4c8166c-54a7-c6b6-3a7b-32551a140f0c/mzaf_10065099307409249764.plus.aac.p.m4a"
];

// Fallback tracks if Gemini fails
const BACKUP_TRACKS = [
  { id: "bf-1", title: "Sunny Day", artist: "MoodFlow Band", duration: "2:45", coverUrl: "https://picsum.photos/seed/sunshine/400/400", previewUrl: DEMO_AUDIO_POOL[0], source: "backup" },
  { id: "bf-2", title: "Rainy Mood", artist: "Chill AI", duration: "3:20", coverUrl: "https://picsum.photos/seed/rain/400/400", previewUrl: DEMO_AUDIO_POOL[1], source: "backup" },
  { id: "bf-3", title: "Power Up", artist: "Gym Rat", duration: "2:10", coverUrl: "https://picsum.photos/seed/fire/400/400", previewUrl: DEMO_AUDIO_POOL[2], source: "backup" },
  { id: "bf-4", title: "Zen Garden", artist: "Nature Sounds", duration: "4:00", coverUrl: "https://picsum.photos/seed/leaf/400/400", previewUrl: DEMO_AUDIO_POOL[3], source: "backup" }
];

const fetchTracks = async (intent) => {
  // If Gemini didn't return a valid intent, return safety tracks
  if (!intent) {
    console.warn("[MusicService] No intent provided, using backups.");
    return BACKUP_TRACKS;
  }

  try {
    // 1. Build Dynamic Query from Intent
    // Use Math.random() to make it unpredictable even with same intent
    const genres = intent.genres || ["Pop"];
    const keywords = intent.keywords || ["Hits"];
    
    // Pick random elements to form a unique search term
    const genre = genres[Math.floor(Math.random() * genres.length)];
    const keyword = keywords[Math.floor(Math.random() * keywords.length)];
    
    // Mix query structure: "Genre Keyword" or just "Genre" or "Keyword"
    const roll = Math.random();
    let term = "";
    if (roll < 0.5) term = `${genre} ${keyword}`;
    else if (roll < 0.8) term = `${keyword} music`;
    else term = `${genre}`;

    console.log(`[MusicService] Search Strategy: "${term}" from Intent:`, intent.mood_variation);
    
    const query = encodeURIComponent(term);
    // Fetch 50 results to have a large pool to shuffle
    const res = await fetch(`https://itunes.apple.com/search?term=${query}&media=music&entity=song&limit=50&explicit=No`);
    
    if (!res.ok) {
        throw new Error("iTunes API error");
    }
    
    const data = await res.json();
    let results = data.results || [];

    if (results.length === 0) {
        console.warn("[MusicService] No results from iTunes. Using backups.");
        return BACKUP_TRACKS;
    }

    // 2. Fisher-Yates Shuffle the 50 results
    for (let i = results.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [results[i], results[j]] = [results[j], results[i]];
    }

    // 3. Select top 10 valid tracks (must have preview & art)
    const tracks = results
        .filter(t => t.previewUrl && t.artworkUrl100)
        .slice(0, 10)
        .map(t => ({
            id: `itunes-${t.trackId}`,
            title: t.trackName,
            artist: t.artistName,
            duration: "0:30", // Previews are standard 30s
            coverUrl: t.artworkUrl100.replace('100x100', '600x600'), // Get High-Res
            previewUrl: t.previewUrl,
            source: "itunes-search" 
        }));

    return tracks.length > 0 ? tracks : BACKUP_TRACKS;

  } catch (error) {
    console.error(`[MusicService] Error: ${error.message}`);
    return BACKUP_TRACKS;
  }
};

module.exports = {
  fetchTracks
};
