// src/components/Sidebar.js
import { Home, Search, Library, Heart, Plus } from 'lucide-react';

export default function Sidebar({ currentPage, setCurrentPage }) {
  return (
    <div className="hidden md:flex flex-col w-64 bg-black border-r border-gray-800 h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-6">Your Library</h2>
        <nav className="space-y-2">
          <button
            onClick={() => setCurrentPage('home')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentPage === 'home' ? 'bg-orange-500 text-black' : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Home size={20} />
            <span>Home</span>
          </button>
          <button
            onClick={() => setCurrentPage('search')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentPage === 'search' ? 'bg-orange-500 text-black' : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Search size={20} />
            <span>Search</span>
          </button>
          
        </nav>
      </div>

      <div className="px-6 py-4 border-t border-gray-800">
        <h3 className="text-sm font-semibold text-gray-400 mb-4">PLAYLISTS</h3>
        <div className="space-y-2">
          <button
            onClick={() => setCurrentPage('playlistmaker')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'playlistmaker' ? 'bg-orange-500 text-black' : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Plus size={16} />
            <span className="text-sm">Create Playlist</span>
          </button>
          <button
            onClick={() => setCurrentPage('likedsongs')}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
              currentPage === 'likedsongs' ? 'bg-orange-500 text-black' : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Heart size={16} />
            <span className="text-sm">Liked Songs</span>
          </button>
        </div>
      </div>
    </div>
  );
}