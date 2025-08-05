import { Search, Home, User } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="bg-black border-b border-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold text-white">Groove Hub</h1>
          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'home' ? 'bg-orange-500 text-black' : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Home size={20} />
              <span>Home</span>
            </button>
            <button
              onClick={() => setCurrentPage('search')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'search' ? 'bg-orange-500 text-black' : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Search size={20} />
              <span>Search</span>
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
            <User size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}