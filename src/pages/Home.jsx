import { useState, useEffect, useContext } from 'react';
import { AudioContext } from '../context/AudioContext';
import { ToastContext } from '../context/ToastContext';
import AlbumCard from '../components/AlbumCard';
import ArtistCard from '../components/ArtistCard';
import TrackCard from '../components/TrackCard';
import SkeletonLoader from '../components/SkeletonLoader';
import {
  getNewReleases,
  getMyTopArtists,
  getFeaturedPlaylists,
  getMyTopTracks,
  getRecentlyPlayed,
} from '../services/spotifyAPI';
import logger from '../utils/logger'; // Import the logger

export default function Home({
  likedTracks = [],
  toggleLikeTrack,
  addToPlaylist,
  playlists = [],
  selectedPlaylistId,
  setSelectedPlaylistId,
  token,
}) {
  const { currentTrack, setCurrentTrack, isPlaying, setIsPlaying } = useContext(AudioContext);
  const { showToast } = useContext(ToastContext);
  const [newReleases, setNewReleases] = useState(null);
  const [topArtists, setTopArtists] = useState(null);
  const [featuredPlaylists, setFeaturedPlaylists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [releases, artists, playlists, tracks, recentlyPlayed] = await Promise.all([
          getNewReleases(token),
          getMyTopArtists(token),
          getFeaturedPlaylists(token),
          getMyTopTracks(token),
          getRecentlyPlayed(token),
        ]);

        setNewReleases(releases);
        setTopArtists(artists);
        setFeaturedPlaylists(playlists);
        setTopTracks(tracks);
        setRecentlyPlayed(recentlyPlayed);
      } catch (error) {
        logger.error('Error fetching data:', error);
        setError('Failed to load music data. Please try again later.');
        showToast('Failed to load music data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, showToast]);

  const handleTrackPlay = (track) => {
    if (currentTrack?.id === track.id && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      showToast(`Playing ${track.name}`, 'success');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <SkeletonLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-orange-400 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div className="mb-6 flex items-center gap-4">
        <label htmlFor="playlist-select" className="text-lg font-semibold text-white">Add to Playlist:</label>
        <select
          id="playlist-select"
          className="bg-gray-800 text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={selectedPlaylistId || ''}
          onChange={e => setSelectedPlaylistId(e.target.value)}
        >
          <option value="" disabled>Select a playlist</option>
          {playlists.length === 0 && <option value="" disabled>No playlists found</option>}
          {playlists.map(pl => (
            <option key={pl.id} value={pl.id}>{pl.name}</option>
          ))}
        </select>
      </div>

      <div className="relative bg-gradient-to-r from-orange-500/20 to-transparent rounded-2xl p-8 overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Your
            <span className="text-orange-500"> Sound</span>
          </h1>
          <p className="text-gray-300 text-lg mb-6 max-w-md">
            Explore millions of songs, create playlists, and discover new artists
          </p>
          <button className="bg-orange-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-orange-400 transition-colors">
            Start Listening
          </button>
        </div>
      </div>

      {newReleases?.albums?.items.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">New Releases</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {newReleases.albums.items.slice(0, 10).map((album) => (
              <AlbumCard
                key={album.id}
                album={album}
                likedTracks={likedTracks}
                toggleLikeTrack={toggleLikeTrack}
                addToPlaylist={addToPlaylist}
                selectedPlaylistId={selectedPlaylistId}
              />
            ))}
          </div>
        </section>
      )}

      {topTracks?.items?.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Your Top Tracks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topTracks.items.slice(0, 5).map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                onPlay={() => handleTrackPlay(track)}
                isPlaying={currentTrack?.id === track.id && isPlaying}
                likedTracks={likedTracks}
                toggleLikeTrack={toggleLikeTrack}
                addToPlaylist={addToPlaylist}
                selectedPlaylistId={selectedPlaylistId}
              />
            ))}
          </div>
        </section>
      )}

      {topArtists?.items?.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Your Top Artists</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {topArtists.items.slice(0, 8).map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>
      )}

      {recentlyPlayed?.items?.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Recently Played</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentlyPlayed.items.slice(0, 5).map((item) => (
              <TrackCard
                key={item.track.id}
                track={item.track}
                onPlay={() => handleTrackPlay(item.track)}
                isPlaying={currentTrack?.id === item.track.id && isPlaying}
                likedTracks={likedTracks}
                toggleLikeTrack={toggleLikeTrack}
                addToPlaylist={addToPlaylist}
                selectedPlaylistId={selectedPlaylistId}
              />
            ))}
          </div>
        </section>
      )}

      {featuredPlaylists?.playlists?.items.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Featured Playlists</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredPlaylists.playlists.items.slice(0, 5).map((playlist) => (
              <AlbumCard key={playlist.id} album={playlist} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}