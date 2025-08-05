import { useState, useEffect, useContext } from 'react';
import { searchSpotify } from '../services/spotifyAPI';
import { AudioContext } from '../context/AudioContext';
import { ToastContext } from '../context/ToastContext';
import SearchBar from './SearchBar';
import TrackCard from './TrackCard';
import AlbumCard from './AlbumCard';
import ArtistCard from './ArtistCard';
import SkeletonLoader from './SkeletonLoader';

export default function SearchPage({
  token,
  likedTracks = [],
  toggleLikeTrack,
  addToPlaylist,
  playlists = [],
  selectedPlaylistId,
  setCurrentPage,
}) {
  const { currentTrack, setCurrentTrack, isPlaying, setIsPlaying } = useContext(AudioContext);
  const { showToast } = useContext(ToastContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const performSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    if (!token) {
      setError('Please log in to search for music.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchSpotify(query, token);
      setSearchResults(data);
    } catch (err) {
      console.error('Error fetching search results:', err);
      setError('Failed to fetch search results. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleTrackPlay = (track) => {
    if (currentTrack?.id === track.id && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      showToast(`Playing ${track.name}`, 'success');
    }
  };

  return (
    <div className="p-6 space-y-8 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-white">Search Music</h2>

      <div className="max-w-xl mx-auto">
        <SearchBar
          searchQuery={searchTerm}
          setSearchQuery={setSearchTerm}
          onSearch={performSearch}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        {loading && <SkeletonLoader />}
        {error && <p className="text-center text-red-500">{error}</p>}
        {searchResults && (
          <div className="space-y-8">
            {searchResults.tracks?.items.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold mb-4 text-white">Tracks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.tracks.items.map((track) => (
                    <TrackCard
                      key={track.id}
                      track={track}
                      onPlay={() => handleTrackPlay(track)}
                      isPlaying={currentTrack?.id === track.id && isPlaying}
                      likedTracks={likedTracks}
                      toggleLikeTrack={toggleLikeTrack}
                      addToPlaylist={addToPlaylist}
                      selectedPlaylistId={selectedPlaylistId}
                      setCurrentPage={setCurrentPage}
                    />
                  ))}
                </div>
              </section>
            )}

            {searchResults.albums?.items.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold mb-4 text-white">Albums</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {searchResults.albums.items.map((album) => (
                    <AlbumCard
                      key={album.id}
                      album={album}
                      likedTracks={likedTracks}
                      toggleLikeTrack={toggleLikeTrack}
                      addToPlaylist={addToPlaylist}
                      selectedPlaylistId={selectedPlaylistId}
                      setCurrentPage={setCurrentPage}
                    />
                  ))}
                </div>
              </section>
            )}

            {searchResults.artists?.items.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold mb-4 text-white">Artists</h3>
                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
                  {searchResults.artists.items.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                  ))}
                </div>
              </section>
            )}

            {searchResults.tracks?.items.length === 0 &&
              searchResults.albums?.items.length === 0 &&
              searchResults.artists?.items.length === 0 &&
              searchTerm.trim() !== '' && (
                <p className="text-center text-gray-400">
                  No results found for "{searchTerm}".
                </p>
              )}
          </div>
        )}
      </div>
    </div>
  );
}