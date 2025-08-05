import React, { useState, useEffect } from 'react';

function PlaylistMaker() {
  const [showModal, setShowModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [expandedPlaylistId, setExpandedPlaylistId] = useState(null);

  useEffect(() => {
    try {
      const storedPlaylists = localStorage.getItem('userPlaylists');
      if (storedPlaylists) {
        setUserPlaylists(JSON.parse(storedPlaylists));
      }
    } catch (error) {
      console.error("Failed to parse playlists from localStorage:", error);
      localStorage.removeItem('userPlaylists');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userPlaylists', JSON.stringify(userPlaylists));
  }, [userPlaylists]);

  const handleCreatePlaylistClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewPlaylistName('');
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist = {
        id: `playlist-${Date.now()}`,
        name: newPlaylistName.trim(),
        songs: [],
      };
      setUserPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
      handleCloseModal();
      alert(`Playlist "${newPlaylistName.trim()}" created!`);
    } else {
      alert("Playlist name cannot be empty.");
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Playlists</h2>

      <div className="flex justify-center mb-8">
        <button
          onClick={handleCreatePlaylistClick}
          className="px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600 transition-colors duration-200 shadow-lg"
        >
          Create New Playlist
        </button>
      </div>

      <div className="max-w-3xl mx-auto">
        {userPlaylists.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            You haven't created any playlists yet. Click "Create New Playlist" to get started!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                className={`bg-gray-800 rounded-lg p-4 cursor-pointer hover:bg-gray-700 transition-colors duration-200 flex flex-col items-center text-center ${expandedPlaylistId === playlist.id ? 'ring-2 ring-orange-500' : ''}`}
                onClick={() => setExpandedPlaylistId(expandedPlaylistId === playlist.id ? null : playlist.id)}
              >
                <img
                  src={playlist.imageUrl || 'https://via.placeholder.com/150/663399/FFFFFF?text=My+Playlist'}
                  alt={playlist.name}
                  className="w-32 h-32 rounded-md mb-3 object-cover"
                />
                <h3 className="text-lg font-semibold truncate w-full px-2">{playlist.name}</h3>
                <p className="text-sm text-gray-400">{playlist.songs.length} songs</p>
                {expandedPlaylistId === playlist.id && (
                  <div className="w-full mt-4 bg-gray-900 rounded p-3 text-left">
                    <h4 className="font-semibold mb-2 text-orange-400">Songs:</h4>
                    {playlist.songs.length === 0 ? (
                      <p className="text-gray-400 text-sm">No songs in this playlist yet.</p>
                    ) : (
                      <ul className="space-y-2">
                        {playlist.songs.map((song, idx) => (
                          <li key={song.id || idx} className="flex items-center gap-2">
                            {/* Use Spotify properties for song info */}
                            <img src={song.album?.images?.[2]?.url || '/placeholder.svg'} alt={song.name} className="w-8 h-8 rounded" />
                            <div>
                              <div className="text-white text-sm font-medium">{song.name || 'Unknown Title'}</div>
                              <div className="text-gray-400 text-xs">{song.artists?.[0]?.name || 'Unknown Artist'}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-white text-center">Create New Playlist</h3>
            <input
              type="text"
              placeholder="Enter playlist name"
              className="w-full px-4 py-3 mb-6 bg-gray-800 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreatePlaylist();
                }
              }}
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePlaylist}
                className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-200 font-semibold"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaylistMaker;