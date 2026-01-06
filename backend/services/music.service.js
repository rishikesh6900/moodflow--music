// NO DEEZER INTEGRATION - Mock Audio Service
// We use Gemini to get the titles, but since AI can't generate real audio files,
// we map them to a pool of high-quality royalty-free demo tracks so the UI works.

const DEMO_AUDIO_POOL = [
  "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
  "https://cdn.pixabay.com/download/audio/2022/03/24/audio_344fe41135.mp3",
  "https://cdn.pixabay.com/download/audio/2022/02/07/audio_d06231bd46.mp3",
  "https://cdn.pixabay.com/download/audio/2022/10/25/audio_96489a63v9.mp3"
];

// Fallback tracks if Gemini fails
const BACKUP_TRACKS = [
  { id: "bf-1", title: "Sunny Day", artist: "MoodFlow Band", duration: "2:45", coverUrl: "https://picsum.photos/seed/sunshine/400/400", previewUrl: DEMO_AUDIO_POOL[0], source: "backup" },
  { id: "bf-2", title: "Rainy Mood", artist: "Chill AI", duration: "3:20", coverUrl: "https://picsum.photos/seed/rain/400/400", previewUrl: DEMO_AUDIO_POOL[1], source: "backup" },
  { id: "bf-3", title: "Power Up", artist: "Gym Rat", duration: "2:10", coverUrl: "https://picsum.photos/seed/fire/400/400", previewUrl: DEMO_AUDIO_POOL[2], source: "backup" },
  { id: "bf-4", title: "Zen Garden", artist: "Nature Sounds", duration: "4:00", coverUrl: "https://picsum.photos/seed/leaf/400/400", previewUrl: DEMO_AUDIO_POOL[3], source: "backup" }
];

const fetchTracks = async (geminiSongList) => {
  // If Gemini failed (empty list), return safety tracks
  if (!geminiSongList || geminiSongList.length === 0) {
    return BACKUP_TRACKS;
  }

  // Map Gemini's text titles to our Track object with Fake Audio
  return geminiSongList.map((song, index) => ({
    id: `ai-track-${index}`,
    title: song.title,
    artist: song.artist,
    duration: song.duration || "3:00",
    // Use Lorem Picsum with the song title as a seed to generate consistent, high-quality cover art images
    coverUrl: `https://picsum.photos/seed/${encodeURIComponent(song.title + song.artist)}/400/400`,
    // Cycle through the demo audio files so every song plays SOMETHING
    previewUrl: DEMO_AUDIO_POOL[index % DEMO_AUDIO_POOL.length],
    source: 'ai-generated'
  }));
};

const formatDuration = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

module.exports = {
  fetchTracks
};
