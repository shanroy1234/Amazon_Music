import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, User } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <header 
      className={`sticky top-0 z-30 flex items-center justify-between px-6 py-4 transition-colors duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => navigate(1)}
            className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {location.pathname === '/search' && (
          <form onSubmit={handleSearch} className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-80 py-2.5 pl-10 pr-4 rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors">
          <User size={18} />
          <span className="text-sm font-medium">Account</span>
        </button>
      </div>
    </header>
  );
};

export default Header;