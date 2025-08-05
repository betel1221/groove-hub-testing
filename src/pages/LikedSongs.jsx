import React from "react";

export default function LikedSongs({ likedTracks = [], toggleLikeTrack }) {
  const formatDuration = (ms) => {
    if (!ms) return '0:00';
    const seconds = Math.floor((ms / 1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor(ms / 1000 / 60);
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col w-full h-full bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Liked Songs</h1>
      {likedTracks.length === 0 ? (
        <div className="text-gray-400 text-center mt-16">No liked songs yet. Like some tracks to see them here!</div>
      ) : (
        <ul className="space-y-4">
          {likedTracks.map((track) => (
            <li key={track.id} className="flex items-center bg-gray-900/60 rounded-lg p-4 hover:bg-gray-800 transition-colors">
              <img
                src={track.album?.images?.[2]?.url || "/placeholder.svg?height=60&width=60&text=Album"}
                alt={track.name}
                className="w-12 h-12 rounded-lg object-cover mr-4"
              />
              <div className="flex-1">
                <div className="font-semibold text-base truncate">{track.name}</div>
                <div className="text-gray-400 text-sm truncate">{track.artists?.[0]?.name}</div>
              </div>
              <div className="ml-4 text-xs text-gray-400">{formatDuration(track.duration_ms)}</div>
              <button
                className="ml-4"
                onClick={() => toggleLikeTrack && toggleLikeTrack(track)}
                aria-label="Unlike"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#f43f5e" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}