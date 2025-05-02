import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, PlusCircle, Heart, Music2 } from 'lucide-react';
import { useAppContext } from '../context/AppProvider';

const Sidebar = () => {
  const { playlists } = useAppContext();

  const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 py-3 px-5 text-gray-300 hover:text-white transition-colors ${
      isActive ? 'text-white bg-gray-800/50' : ''
    }`;

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 overflow-hidden bg-gray-950 border-r border-gray-800">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <Music2 className="h-8 w-8 text-blue-500" />
          <h1 className="text-xl font-bold">Amazon Music</h1>
        </div>

        <nav className="mb-6">
          <ul className="space-y-1">
            <li>
              <NavLink to="/" className={navLinkClass}>
                <Home size={20} />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" className={navLinkClass}>
                <Search size={20} />
                <span>Search</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/library" className={navLinkClass}>
                <Library size={20} />
                <span>Your Library</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="pt-4 border-t border-gray-800">
          <button className="flex items-center gap-3 py-3 px-5 text-gray-300 hover:text-white transition-colors w-full text-left">
            <PlusCircle size={20} />
            <span>Create Playlist</span>
          </button>
          <button className="flex items-center gap-3 py-3 px-5 text-gray-300 hover:text-white transition-colors w-full text-left">
            <Heart size={20} />
            <span>Liked Songs</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto border-t border-gray-800 px-3 py-4">
        <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Your Playlists</h3>
        <ul className="space-y-1">
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <NavLink 
                to={`/playlist/${playlist.id}`} 
                className={({ isActive }) => 
                  `block py-2 px-3 rounded-md text-sm ${
                    isActive ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'
                  }`
                }
              >
                {playlist.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;