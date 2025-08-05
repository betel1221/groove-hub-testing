import React from 'react';

const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const SPOTIFY_SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'user-read-recently-played',
  'user-library-read',
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-modify-public',
];

const authUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URI)}&scope=${encodeURIComponent(SPOTIFY_SCOPES.join(' '))}&response_type=token&show_dialog=true`;

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <div className="text-center bg-gray-900 rounded-lg p-12 shadow-xl border border-gray-800">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">GrooveHub</h1>
        <p className="text-lg text-gray-400 mb-8">Your personal music dashboard</p>
        <a
          href={authUrl}
          className="bg-orange-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-400 transition-colors shadow-lg"
        >
          Login with Spotify
        </a>
      </div>
    </div>
  );
}