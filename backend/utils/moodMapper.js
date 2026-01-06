/**
 * Maps frontend mood keywords to specific Deezer search queries
 * to ensure the musical vibe matches the requested emotion.
 */

const MOOD_SEARCH_TERMS = {
  happy: 'upbeat feel good pop summer',
  sad: 'sad melancholic acoustic ballad',
  calm: 'chill lo-fi ambient nature',
  angry: 'heavy metal hard rock intense'
};

const getSearchQuery = (mood) => {
  const normalizedMood = mood.toLowerCase();
  return MOOD_SEARCH_TERMS[normalizedMood] || null;
};

const isValidMood = (mood) => {
  return Object.keys(MOOD_SEARCH_TERMS).includes(mood.toLowerCase());
};

module.exports = {
  getSearchQuery,
  isValidMood
};