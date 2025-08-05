export const authEndpoint = "https://accounts.spotify.com/authorize";

// Correct variable assignments
const clientId = process.env.VITE_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.VITE_SPOTIFY_REDIRECT_URI;

const scopes = [
  "user-read-private",
  "user-read-email",
  "user-top-read",
  "playlist-read-private",
  "playlist-modify-private",
  "user-library-read",
  "user-library-modify",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
];

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;