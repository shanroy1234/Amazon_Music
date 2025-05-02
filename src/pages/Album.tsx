import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Play, Pause, Heart } from 'lucide-react';
import { useAppContext } from '../context/AppProvider';
import TrackList from '../components/TrackList';
import { Album as AlbumType } from '../types';

const Album = () => {
  const { id } = useParams<{ id: string }>();
  const { albums, currentTrack, isPlaying, setCurrentTrack, togglePlayPause } = useAppContext();
  const [album, setAlbum] = useState<AlbumType | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    const foundAlbum = albums.find(a => a.id === id);
    if (foundAlbum) {
      setAlbum(foundAlbum);
    }
  }, [id, albums]);
  
  if (!album) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading album...</p>
      </div>
    );
  }
  
  const isAlbumPlaying = 
    isPlaying && 
    currentTrack && 
    currentTrack.album.id === album.id;
  
  const handlePlayAlbum = () => {
    if (!album.tracks || album.tracks.length === 0) return;
    
    if (isAlbumPlaying) {
      togglePlayPause();
    } else {
      setCurrentTrack(album.tracks[0]);
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
  
  const totalDuration = album.tracks ? album.tracks.reduce((total, track) => total + track.duration, 0) : 0;

  return (
    <div className="pb-20">
      <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
        <img 
          src={album.imageUrl} 
          alt={album.name} 
          className="w-52 h-52 object-cover shadow-2xl rounded-md"
        />
        
        <div className="flex flex-col">
          <span className="text-sm font-medium uppercase">Album</span>
          <h1 className="text-5xl font-bold mt-2 mb-4">{album.name}</h1>
          
          <div className="flex items-center gap-1 text-sm text-gray-300">
            <span className="font-medium">{album.artist}</span>
            <span className="mx-1">•</span>
            <span>{album.releaseYear}</span>
            <span className="mx-1">•</span>
            <span>{album.tracks ? album.tracks.length : 0} songs,</span>
            <span className="ml-1">{formatDuration(totalDuration)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6 mb-8">
        <button 
          onClick={handlePlayAlbum}
          className="p-4 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          {isAlbumPlaying ? <Pause size={24} /> : <Play size={24} fill="white" />}
        </button>
        
        <button 
          onClick={toggleLike}
          className={`text-3xl ${isLiked ? 'text-blue-500' : 'text-gray-300'}`}
        >
          <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      {album.tracks && album.tracks.length > 0 && (
        <TrackList 
          tracks={album.tracks} 
          showAlbum={false}
        />
      )}
    </div>
  );
};

export default Album;