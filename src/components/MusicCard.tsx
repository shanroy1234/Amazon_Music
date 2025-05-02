import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { useAppContext } from '../context/AppProvider';
import { Album, Playlist } from '../types';

interface MusicCardProps {
  item: Album | Playlist;
  type: 'album' | 'playlist';
}

const MusicCard: React.FC<MusicCardProps> = ({ item, type }) => {
  const { setCurrentTrack, togglePlayPause, isPlaying, currentTrack } = useAppContext();
  
  const isCurrentlyPlaying = 
    currentTrack && 
    ((type === 'album' && currentTrack.album.id === item.id) || 
    (type === 'playlist' && currentTrack.playlist?.id === item.id));
  
  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // For simplicity, just play the first track of the album/playlist
    if (type === 'album') {
      const album = item as Album;
      if (album.tracks && album.tracks.length > 0) {
        if (isCurrentlyPlaying) {
          togglePlayPause();
        } else {
          setCurrentTrack(album.tracks[0]);
        }
      }
    } else {
      const playlist = item as Playlist;
      if (playlist.tracks && playlist.tracks.length > 0) {
        if (isCurrentlyPlaying) {
          togglePlayPause();
        } else {
          setCurrentTrack({...playlist.tracks[0], playlist});
        }
      }
    }
  };

  return (
    <Link
      to={`/${type}/${item.id}`}
      className="group p-4 bg-gray-800/30 rounded-md hover:bg-gray-800/70 transition-all duration-300"
    >
      <div className="relative mb-4">
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full aspect-square object-cover rounded-md shadow-lg"
        />
        <button
          onClick={handlePlay}
          className="absolute right-2 bottom-2 p-3 bg-blue-500 rounded-full shadow-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 hover:bg-blue-600"
        >
          <Play fill="white" size={16} />
        </button>
      </div>
      <h3 className="font-semibold truncate">{item.name}</h3>
      <p className="text-sm text-gray-400 truncate mt-1">
        {type === 'album' ? (item as Album).artist : `By ${(item as Playlist).creator}`}
      </p>
    </Link>
  );
};

export default MusicCard;