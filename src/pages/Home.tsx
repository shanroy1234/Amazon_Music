import React from 'react';
import CategorySection from '../components/CategorySection';
import { useAppContext } from '../context/AppProvider';

const Home = () => {
  const { featuredPlaylists, newReleases, recommendedAlbums } = useAppContext();

  return (
    <div className="pb-20">
      <h1 className="text-3xl font-bold mb-6">Good afternoon</h1>
      
      <CategorySection 
        title="Featured Playlists" 
        seeAllLink="/featured"
        items={featuredPlaylists}
        type="playlist"
      />
      
      <CategorySection 
        title="New Releases" 
        seeAllLink="/new-releases"
        items={newReleases}
        type="album"
      />
      
      <CategorySection 
        title="Recommended for You"
        items={recommendedAlbums}
        type="album"
      />
    </div>
  );
};

export default Home;