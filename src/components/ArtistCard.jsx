import { useState } from 'react';

export default function ArtistCard({ artist }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getImageSrc = () => {
    if (imageError) {
      return '/placeholder.svg?height=120&width=120&text=Artist';
    }
    // Use Spotify's image array for artist pictures
    return artist.images?.[1]?.url || '/placeholder.svg?height=120&width=120&text=Artist';
  };

  return (
    <div
      className="text-center cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative mb-3">
        <img
          src={getImageSrc()}
          alt={artist.name}
          className={`w-full aspect-square rounded-full object-cover transition-all ${isHovered ? 'scale-105' : ''}`}
          onError={() => setImageError(true)}
        />
        {isHovered && <div className="absolute inset-0 bg-black/30 rounded-full"></div>}
      </div>

      <h3 className="font-semibold text-white truncate text-sm">{artist.name || 'Unknown Artist'}</h3>
      <p className="text-gray-400 text-xs">Artist</p>
    </div>
  );
}