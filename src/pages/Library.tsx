import React, { useState } from 'react';
import { useAppContext } from '../context/AppProvider';
import MusicCard from '../components/MusicCard';

type LibraryTab = 'playlists' | 'albums' | 'songs' | 'artists';

const Library = () => {
  const [activeTab, setActiveTab] = useState<LibraryTab>('playlists');
  const { playlists, savedAlbums } = useAppContext();
  
  const tabs: { id: LibraryTab; label: string }[] = [
    { id: 'playlists', label: 'Playlists' },
    { id: 'albums', label: 'Albums' },
    { id: 'songs', label: 'Songs' },
    { id: 'artists', label: 'Artists' },
  ];

  return (
    <div className="pb-20">
      <h1 className="text-3xl font-bold mb-6">Your Library</h1>
      
      <div className="flex gap-2 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeTab === tab.id 
                ? 'bg-white text-black' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="mt-6">
        {activeTab === 'playlists' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {playlists.map(playlist => (
              <MusicCard key={playlist.id} item={playlist} type="playlist" />
            ))}
          </div>
        )}
        
        {activeTab === 'albums' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {savedAlbums.map(album => (
              <MusicCard key={album.id} item={album} type="album" />
            ))}
          </div>
        )}
        
        {activeTab === 'songs' && (
          <div className="text-center text-gray-400 mt-20">
            <p>Your saved songs will appear here</p>
          </div>
        )}
        
        {activeTab === 'artists' && (
          <div className="text-center text-gray-400 mt-20">
            <p>Your followed artists will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;