import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppProvider';
import MusicCard from '../components/MusicCard';
import TrackList from '../components/TrackList';

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';
  
  const { albums, playlists, allTracks } = useAppContext();
  const [searchResults, setSearchResults] = useState({
    albums: [],
    playlists: [],
    tracks: [],
  });
  
  useEffect(() => {
    if (query) {
      const lowerQuery = query.toLowerCase();
      
      const filteredAlbums = albums.filter(album => 
        album.name.toLowerCase().includes(lowerQuery) || 
        album.artist.toLowerCase().includes(lowerQuery)
      );
      
      const filteredPlaylists = playlists.filter(playlist => 
        playlist.name.toLowerCase().includes(lowerQuery)
      );
      
      const filteredTracks = allTracks.filter(track => 
        track.title.toLowerCase().includes(lowerQuery) || 
        track.artist.toLowerCase().includes(lowerQuery) ||
        track.album.name.toLowerCase().includes(lowerQuery)
      );
      
      setSearchResults({
        albums: filteredAlbums,
        playlists: filteredPlaylists,
        tracks: filteredTracks,
      });
    } else {
      setSearchResults({
        albums: [],
        playlists: [],
        tracks: [],
      });
    }
  }, [query, albums, playlists, allTracks]);

  const genres = [
    { id: '1', name: 'Pop', color: 'from-pink-500 to-purple-500', image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg' },
    { id: '2', name: 'Hip-Hop', color: 'from-yellow-500 to-orange-500', image: 'https://images.pexels.com/photos/3379258/pexels-photo-3379258.jpeg' },
    { id: '3', name: 'Rock', color: 'from-red-500 to-red-800', image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg' },
    { id: '4', name: 'Electronic', color: 'from-blue-400 to-indigo-600', image: 'https://images.pexels.com/photos/1649880/pexels-photo-1649880.jpeg' },
    { id: '5', name: 'R&B', color: 'from-purple-400 to-purple-800', image: 'https://images.pexels.com/photos/1309240/pexels-photo-1309240.jpeg' },
    { id: '6', name: 'Country', color: 'from-green-400 to-green-700', image: 'https://images.pexels.com/photos/3352448/pexels-photo-3352448.jpeg' },
    { id: '7', name: 'Jazz', color: 'from-amber-400 to-amber-700', image: 'https://images.pexels.com/photos/4087991/pexels-photo-4087991.jpeg' },
    { id: '8', name: 'Classical', color: 'from-slate-400 to-slate-700', image: 'https://images.pexels.com/photos/4088020/pexels-photo-4088020.jpeg' },
  ];

  return (
    <div className="pb-20">
      {!query ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Browse</h1>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {genres.map(genre => (
              <div 
                key={genre.id}
                className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${genre.color} h-40 cursor-pointer transition-transform hover:scale-[1.02]`}
              >
                <div className="absolute inset-0 bg-black/20"></div>
                <img 
                  src={genre.image} 
                  alt={genre.name}
                  className="absolute right-0 bottom-0 h-24 w-24 object-cover rotate-[25deg] translate-x-[18%] translate-y-[5%] shadow-xl rounded"
                />
                <h3 className="absolute left-4 top-4 text-2xl font-bold">{genre.name}</h3>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">
            Search results for "{query}"
          </h1>
          
          {searchResults.tracks.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Songs</h2>
              <TrackList tracks={searchResults.tracks.slice(0, 5)} />
            </section>
          )}
          
          {searchResults.albums.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Albums</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                {searchResults.albums.map(album => (
                  <MusicCard key={album.id} item={album} type="album" />
                ))}
              </div>
            </section>
          )}
          
          {searchResults.playlists.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Playlists</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
                {searchResults.playlists.map(playlist => (
                  <MusicCard key={playlist.id} item={playlist} type="playlist" />
                ))}
              </div>
            </section>
          )}
          
          {searchResults.tracks.length === 0 && 
           searchResults.albums.length === 0 && 
           searchResults.playlists.length === 0 && (
            <div className="text-center text-gray-400 py-20">
              <p className="text-xl mb-2">No results found for "{query}"</p>
              <p>Try searching for something else</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;