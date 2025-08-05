import { useState, useEffect, useCallback } from 'react';
import { AudioProvider } from './context/AudioContext.jsx';
import { ToastProvider } from './context/ToastContext';

import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Search from './pages/Search';
import AudioPlayer from './components/AudioPlayer';
import PlaylistMaker from './components/PlaylistMaker';
import LikedSongs from './pages/LikedSongs';
import LoginPage from './components/LoginPage'; // New import

function App() {
  const [token, setToken] = useState(null); // Add token state
  const [currentPage, setCurrentPage] = useState('home');
  const [likedTracks, setLikedTracks] = useState([]);
  const [playlists, setPlaylists] = useState(() => {
    try {
      const stored = localStorage.getItem('userPlaylists');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  useEffect(() => {
    // Check for access token in URL hash on app load
    const hash = window.location.hash;
    let tokenFromHash = window.localStorage.getItem('spotify_token');

    if (!tokenFromHash && hash) {
      const tokenString = hash.substring(1).split('&').find(elem => elem.startsWith('access_token'));
      if (tokenString) {
        tokenFromHash = tokenString.split('=')[1];
        window.localStorage.setItem('spotify_token', tokenFromHash);
      }
      window.location.hash = ''; // Clear the hash from the URL
    }
    setToken(tokenFromHash);
  }, []);

  const savePlaylists = (pls) => {
    setPlaylists(pls);
    localStorage.setItem('userPlaylists', JSON.stringify(pls));
  };

  const toggleLikeTrack = useCallback((track) => {
    setLikedTracks((prev) => {
      const exists = prev.some((t) => t.id === track.id);
      if (exists) {
        return prev.filter((t) => t.id !== track.id);
      } else {
        return [...prev, track];
      }
    });
  }, []);

  const createPlaylist = useCallback((name) => {
    const newPlaylist = {
      id: `playlist-${Date.now()}`,
      name,
      songs: [],
    };
    const updated = [...playlists, newPlaylist];
    savePlaylists(updated);
    setSelectedPlaylistId(newPlaylist.id);
  }, [playlists]);

  const addToPlaylist = useCallback((track, playlistId) => {
    const updated = playlists.map((pl) => {
      if (pl.id === playlistId) {
        if (pl.songs.some((t) => t.id === track.id)) return pl;
        return { ...pl, songs: [...pl.songs, track] };
      }
      return pl;
    });
    savePlaylists(updated);
  }, [playlists]);

  const removeFromPlaylist = useCallback((trackId, playlistId) => {
    const updated = playlists.map((pl) => {
      if (pl.id === playlistId) {
        return { ...pl, songs: pl.songs.filter((t) => t.id !== trackId) };
      }
      return pl;
    });
    savePlaylists(updated);
  }, [playlists]);

  if (!token) {
    return <LoginPage />;
  }

  return (
    <AudioProvider>
      <ToastProvider>
        <div className="bg-black min-h-screen text-white flex">
          <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <div className="flex-1 flex flex-col">
            <main className="flex-1 pb-20">
              {currentPage === 'home' && <Home token={token} likedTracks={likedTracks} toggleLikeTrack={toggleLikeTrack} playlists={playlists} addToPlaylist={addToPlaylist} selectedPlaylistId={selectedPlaylistId} setSelectedPlaylistId={setSelectedPlaylistId} />}
              {currentPage === 'search' && <Search token={token} likedTracks={likedTracks} toggleLikeTrack={toggleLikeTrack} playlists={playlists} addToPlaylist={addToPlaylist} selectedPlaylistId={selectedPlaylistId} setSelectedPlaylistId={setSelectedPlaylistId} />}
              {currentPage === 'playlistmaker' && <PlaylistMaker playlists={playlists} createPlaylist={createPlaylist} removeFromPlaylist={removeFromPlaylist} setSelectedPlaylistId={setSelectedPlaylistId} />}
              {currentPage === 'likedsongs' && <LikedSongs likedTracks={likedTracks} toggleLikeTrack={toggleLikeTrack} />}
            </main>
            <AudioPlayer />
          </div>
        </div>
      </ToastProvider>
    </AudioProvider>
  );
}

export default App;