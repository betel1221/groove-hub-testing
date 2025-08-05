import axios from 'axios';

const API_BASE_URL = 'https://api.spotify.com/v1';

const getHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Search for an item (track, artist, album)
export const searchSpotify = async (query, token) => {
  const headers = getHeaders(token);
  const response = await axios.get(
    `${API_BASE_URL}/search?q=${encodeURIComponent(query)}&type=track,artist,album`,
    headers
  );
  return response.data;
};

// Get the current user's profile
export const getUserProfile = async (token) => {
  const headers = getHeaders(token);
  const response = await axios.get(`${API_BASE_URL}/me`, headers);
  return response.data;
};

// Get a list of new album releases
export const getNewReleases = async (token) => {
  const headers = getHeaders(token);
  const response = await axios.get(`${API_BASE_URL}/browse/new-releases?country=US`, headers);
  return response.data.albums.items;
};

// Get the current user's top artists
export const getMyTopArtists = async (token) => {
  const headers = getHeaders(token);
  const response = await axios.get(`${API_BASE_URL}/me/top/artists?limit=10`, headers);
  return response.data.items;
};

// Get the current user's top tracks
export const getMyTopTracks = async (token) => {
  const headers = getHeaders(token);
  const response = await axios.get(`${API_BASE_URL}/me/top/tracks?limit=10`, headers);
  return response.data.items;
};

// Get a list of Spotify featured playlists
export const getFeaturedPlaylists = async (token) => {
  const headers = getHeaders(token);
  const response = await axios.get(`${API_BASE_URL}/browse/featured-playlists?country=US`, headers);
  return response.data.playlists.items;
};

// Get the current user's recently played tracks
export const getRecentlyPlayed = async (token) => {
  const headers = getHeaders(token);
  const response = await axios.get(`${API_BASE_URL}/me/player/recently-played?limit=10`, headers);
  return response.data.items.map(item => item.track);
};

// Function to get album tracks (useful for showing "Trending Tracks" from "New Releases")
export const getAlbumTracks = async (albumId, token) => {
  const headers = getHeaders(token);
  const response = await axios.get(`${API_BASE_URL}/albums/${albumId}/tracks`, headers);
  return response.data.items;
};