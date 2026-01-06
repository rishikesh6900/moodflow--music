const axios = require('axios');

const DEEZER_BASE_URL = 'https://api.deezer.com/search';

// Robust fallback tracks that ALWAYS work (Offline Mode)
const BACKUP_TRACKS = [
  {
    id: "backup-1",
    title: "Happy Vibes (Demo)",
    artist: "MoodFlow AI",
    duration: "0:30",
    coverUrl: "https://e-cdns-images.dzcdn.net/images/cover/2e018122cb56c862eb93cc3345479261/250x250-000000-80-0-0.jpg",
    previewUrl: "https://cdns-preview-d.dzcdn.net/stream/cfff7b46cf6b6a21054b819f7f457599-3.mp3",
    source: "offline"
  },
  {
    id: "backup-2",
    title: "Summer Breeze",
    artist: "System Offline",
    duration: "0:30",
    coverUrl: "https://e-cdns-images.dzcdn.net/images/cover/033946279f045c7cc896f6437ded2816/250x250-000000-80-0-0.jpg",
    previewUrl: "https://cdns-preview-b.dzcdn.net/stream/cfff7b46cf6b6a21054b819f7f457599-3.mp3",
    source: "offline"
  },
    {
    id: "backup-3",
    title: "Chill Lo-Fi",
    artist: "MoodFlow",
    duration: "0:45",
    coverUrl: "https://e-cdns-images.dzcdn.net/images/cover/df0e3ba23938be98d636838a3d376c6c/250x250-000000-80-0-0.jpg",
    previewUrl: "https://cdns-preview-b.dzcdn.net/stream/cfff7b46cf6b6a21054b819f7f457599-3.mp3",
    source: "offline"
  }
];

const fetchTracks = async (intent) => {
  try {
    // 1. Safe parsing of intent
    const genre = intent.genres?.[0] || 'pop';
    const keyword = intent.keywords?.[0] || '';
    
    // 2. Try specific query first
    let query = `${genre} ${keyword}`.trim();
    console.log(`🎵 Searching Deezer for: "${query}"`);

    let response = await axios.get(DEEZER_BASE_URL, {
      params: { q: query, limit: 15, order: 'RANKING' },
      timeout: 5000 // 5s timeout
    });

    let data = response.data?.data;

    // 3. RETRY STRATEGY: If empty, try broader search (Genre only)
    if (!data || data.length === 0) {
      console.log(`⚠️ No results for "${query}". Retrying with genre: "${genre}"...`);
      response = await axios.get(DEEZER_BASE_URL, {
        params: { q: genre, limit: 15, order: 'RANKING' },
        timeout: 5000
      });
      data = response.data?.data;
    }

    // 4. FAILSAFE: If still empty, return Backup Tracks
    if (!data || data.length === 0) {
      console.warn("⚠️ Deezer API returned 0 results. Serving backup tracks.");
      return BACKUP_TRACKS;
    }

    // 5. Transform & Filter
    const validTracks = data
      .filter(t => t.preview) // Must have audio
      .map(track => ({
        id: track.id.toString(),
        title: track.title,
        artist: track.artist.name,
        duration: formatDuration(track.duration), 
        coverUrl: track.album.cover_medium || track.album.cover_small,
        previewUrl: track.preview,
        source: 'deezer'
      }));
      
    return validTracks.length > 0 ? validTracks : BACKUP_TRACKS;

  } catch (error) {
    console.error("❌ Music Service Connection Failed:", error.message);
    // CRITICAL: Always return data so frontend works
    return BACKUP_TRACKS;
  }
};

const formatDuration = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

module.exports = {
  fetchTracks
};
