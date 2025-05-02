import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play, Pause, Heart, Clock } from 'lucide-react';
import { useAppContext } from '../context/AppProvider';
import TrackList from '../components/TrackList';
import { Playlist as PlaylistType } from '../types';

const Playlist = () => {
  const { id } = useParams<{ id: string }>();
  const { playlists, currentTrack, isPlaying, setCurrentTrack, togglePlayPause } = useAppContext();
  const [playlist, setPlaylist] = useState<PlaylistType | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    const foundPlaylist = playlists.find(p => p.id === id);
    if (foundPlaylist) {
      setPlaylist(foundPlaylist);
    }
  }, [id, playlists]);
  
  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading playlist...</p>
      </div>
    );
  }
  
  const isPlaylistPlaying = 
    isPlaying && 
    currentTrack && 
    currentTrack.playlist?.id === playlist.id;
  
  const handlePlayPlaylist = () => {
    if (!playlist.tracks || playlist.tracks.length === 0) return;
    
    if (isPlaylistPlaying) {
      togglePlayPause();
    } else {
      setCurrentTrack({...playlist.tracks[0], playlist});
    }
  };
  
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const hours = Math.floor(mins / 60);
    
    if (hours > 0) {
      const remainingMins = mins % 60;
      return `${hours} hr ${remainingMins} min`;
    } else {
      return `${mins} min`;
    }
  };
  
  const totalDuration = playlist.tracks ? playlist.tracks.reduce((total, track) => total + track.duration, 0) : 0;

  return (
    <div className="pb-20">
      <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
        <img 
          src={playlist.imageUrl} 
          alt={playlist.name} 
          className="w-52 h-52 object-cover shadow-2xl rounded-md"
        />
        
        <div className="flex flex-col">
          <span className="text-sm font-medium uppercase">Playlist</span>
          <h1 className="text-5xl font-bold mt-2 mb-4">{playlist.name}</h1>
          
          <div className="flex items-center gap-1 text-sm text-gray-300">
            <span className="font-medium">By {playlist.creator}</span>
            <span className="mx-1">•</span>
            <span>{playlist.tracks ? playlist.tracks.length : 0} songs,</span>
            <span className="ml-1">{formatDuration(totalDuration)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6 mb-8">
        <button 
          onClick={handlePlayPlaylist}
          className="p-4 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          {isPlaylistPlaying ? <Pause size={24} /> : <Play size={24} fill="white" />}
        </button>
        
        <button 
          onClick={toggleLike}
          className={`text-3xl ${isLiked ? 'text-blue-500' : 'text-gray-300'}`}
        >
          <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      {playlist.tracks && playlist.tracks.length > 0 && (
        <TrackList 
          tracks={playlist.tracks} 
          showAlbum={true}
        />
      )}
    </div>
  );
};

export default Playlist;