import React from 'react';
import { Play, Pause, Clock, Heart } from 'lucide-react';
import { useAppContext } from '../context/AppProvider';
import { Track } from '../types';

interface TrackListProps {
  tracks: Track[];
  showAlbum?: boolean;
  showArtist?: boolean;
}

const TrackList: React.FC<TrackListProps> = ({ 
  tracks, 
  showAlbum = true,
  showArtist = true
}) => {
  const { currentTrack, isPlaying, setCurrentTrack, togglePlayPause } = useAppContext();
  
  const handlePlayTrack = (track: Track) => {
    if (currentTrack && currentTrack.id === track.id) {
      togglePlayPause();
    } else {
      setCurrentTrack(track);
    }
  };
  
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-[16px_4fr_2fr_1fr] md:grid-cols-[16px_4fr_2fr_2fr_1fr] gap-4 px-4 py-2 border-b border-gray-800 text-gray-400 text-sm">
        <div>#</div>
        <div>TITLE</div>
        {showArtist && <div className="hidden md:block">ARTIST</div>}
        {showAlbum && <div>ALBUM</div>}
        <div className="text-right"><Clock size={16} /></div>
      </div>
      
      <div className="mt-2">
        {tracks.map((track, index) => {
          const isCurrentTrack = currentTrack && currentTrack.id === track.id;
          const isCurrentlyPlaying = isCurrentTrack && isPlaying;
          
          return (
            <div 
              key={track.id}
              className={`grid grid-cols-[16px_4fr_2fr_1fr] md:grid-cols-[16px_4fr_2fr_2fr_1fr] gap-4 px-4 py-3 rounded-md text-sm ${
                isCurrentTrack ? 'bg-gray-800/70 text-blue-500' : 'text-gray-300 hover:bg-gray-800/40'
              }`}
            >
              <div className="flex items-center justify-center">
                {isCurrentTrack ? (
                  <button 
                    onClick={() => togglePlayPause()}
                    className="text-blue-500"
                  >
                    {isCurrentlyPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                ) : (
                  <span className="text-gray-400">{index + 1}</span>
                )}
              </div>
              
              <div 
                className="flex items-center cursor-pointer"
                onClick={() => handlePlayTrack(track)}
              >
                <img 
                  src={track.album.imageUrl} 
                  alt={track.album.name} 
                  className="h-10 w-10 mr-3 rounded"
                />
                <div>
                  <p className={`font-medium ${isCurrentTrack ? 'text-blue-500' : ''}`}>{track.title}</p>
                </div>
              </div>
              
              {showArtist && (
                <div className="hidden md:flex items-center">
                  {track.artist}
                </div>
              )}
              
              {showAlbum && (
                <div className="flex items-center truncate">
                  {track.album.name}
                </div>
              )}
              
              <div className="flex items-center justify-end gap-3">
                <button className="opacity-0 group-hover:opacity-100 hover:text-blue-500">
                  <Heart size={16} />
                </button>
                <span>{formatDuration(track.duration)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackList;