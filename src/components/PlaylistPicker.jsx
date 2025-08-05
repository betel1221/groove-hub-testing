import { useState } from 'react';

export default function PlaylistPicker({ playlists, onSelect, onClose, onCreate }) {
  const [newPlaylistName, setNewPlaylistName] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 w-80 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h3 className="text-lg font-bold mb-4 text-white">Add to Playlist</h3>
        <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
          {playlists.length === 0 && (
            <div className="text-gray-400 text-sm">No playlists found.</div>
          )}
          {playlists.map((pl) => (
            <button
              key={pl.id}
              className="w-full text-left px-3 py-2 rounded hover:bg-orange-500 hover:text-black transition"
              onClick={() => onSelect(pl.id)}
            >
              {pl.name}
            </button>
          ))}
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (newPlaylistName.trim()) {
              onCreate(newPlaylistName.trim());
              setNewPlaylistName('');
            }
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            className="flex-1 rounded px-2 py-1 bg-gray-800 text-white focus:outline-none"
            placeholder="New playlist name"
            value={newPlaylistName}
            onChange={e => setNewPlaylistName(e.target.value)}
          />
          <button
            type="submit"
            className="bg-orange-500 text-black px-3 py-1 rounded hover:bg-orange-400 transition"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
