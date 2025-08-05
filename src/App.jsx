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
    // 1. Check for a stored token in local storage first
    let tokenFromStorage = window.localStorage.getItem('spotify_token');

    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      return; // Stop execution if a token is found
    }

    // 2. If no token is in local storage, check the URL hash
    const hash = window.location.hash;
    if (hash) {
      const tokenString = hash.substring(1).split('&').find(elem => elem.startsWith('access_token'));
      if (tokenString) {
        const tokenFromHash = tokenString.split('=')[1];
        window.localStorage.setItem('spotify_token', tokenFromHash);
        setToken(tokenFromHash);
      }
      window.location.hash = ''; // Clear the hash from the URL
    }
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