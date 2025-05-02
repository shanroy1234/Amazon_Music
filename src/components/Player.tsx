import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Volume1, VolumeX, 
  ListMusic, Maximize2, Heart
} from 'lucide-react';
import { useAppContext } from '../context/AppProvider';

const Player = () => {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlayPause, 
    nextTrack, 
    previousTrack 
  } = useAppContext();
  
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: no repeat, 1: repeat all, 2: repeat one
  const [isLiked, setIsLiked] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Simulate playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        const newTime = Math.min(currentTime + 1, duration);
        setCurrentTime(newTime);
        setProgress((newTime / duration) * 100);
        
        if (newTime >= duration) {
          nextTrack();
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration, nextTrack]);
  
  // Set up track duration
  useEffect(() => {
    if (currentTrack) {
      setDuration(currentTrack.duration);
      setCurrentTime(0);
      setProgress(0);
      
      if (isPlaying && audioRef.current) {
        audioRef.current.play().catch(err => console.error("Play error:", err));
      }
    }
  }, [currentTrack, isPlaying]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !currentTrack) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const percent = Math.min(Math.max(0, e.clientX - rect.left), rect.width) / rect.width;
    const newTime = percent * duration;
    
    setCurrentTime(newTime);
    setProgress(percent * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleRepeat = () => {
    setRepeatMode((repeatMode + 1) % 3);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} />;
    if (volume < 50) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  return (
    <div className="flex items-center justify-between h-20 px-4 bg-gray-900 border-t border-gray-800">
      {currentTrack ? (
        <>
          <audio ref={audioRef} src={currentTrack.previewUrl} />
          
          <div className="flex items-center w-1/4">
            <img 
              src={currentTrack.album.imageUrl} 
              alt={currentTrack.album.name} 
              className="h-14 w-14 object-cover mr-3"
            />
            <div className="mr-4">
              <p className="text-sm font-medium truncate">{currentTrack.title}</p>
              <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
            </div>
            <button 
              onClick={toggleLike}
              className={`p-2 hover:bg-gray-800 rounded-full ${isLiked ? 'text-blue-500' : 'text-gray-400'}`}
            >
              <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
          </div>
          
          <div className="flex flex-col items-center w-2/4">
            <div className="flex items-center gap-4 mb-2">
              <button 
                onClick={toggleShuffle}
                className={`p-2 hover:bg-gray-800 rounded-full ${isShuffle ? 'text-blue-500' : 'text-gray-400'}`}
              >
                <Shuffle size={18} />
              </button>
              <button 
                onClick={previousTrack}
                className="p-2 hover:bg-gray-800 rounded-full text-gray-300"
              >
                <SkipBack size={22} />
              </button>
              <button 
                onClick={togglePlayPause}
                className="p-3 bg-white text-black rounded-full hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} />}
              </button>
              <button 
                onClick={nextTrack}
                className="p-2 hover:bg-gray-800 rounded-full text-gray-300"
              >
                <SkipForward size={22} />
              </button>
              <button 
                onClick={toggleRepeat}
                className={`p-2 hover:bg-gray-800 rounded-full ${
                  repeatMode > 0 ? 'text-blue-500' : 'text-gray-400'
                }`}
              >
                <Repeat size={18} />
                {repeatMode === 2 && <span className="absolute -mt-2 ml-2 text-[8px]">1</span>}
              </button>
            </div>
            
            <div className="flex items-center gap-2 w-full">
              <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
              <div 
                ref={progressRef}
                onClick={handleProgressClick}
                className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer relative"
              >
                <div 
                  className="absolute h-1 bg-gray-300 rounded-full hover:bg-blue-500 transition-colors"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-3 w-1/4">
            <button className="p-2 hover:bg-gray-800 rounded-full text-gray-300">
              <ListMusic size={18} />
            </button>
            <div className="flex items-center gap-1 w-32">
              <button className="p-1 text-gray-300">
                {getVolumeIcon()}
              </button>
              <div className="w-full h-1 bg-gray-700 rounded-full relative">
                <div 
                  className="absolute h-1 bg-gray-300 rounded-full hover:bg-blue-500 transition-colors"
                  style={{ width: `${volume}%` }}
                ></div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <button className="p-2 hover:bg-gray-800 rounded-full text-gray-300">
              <Maximize2 size={18} />
            </button>
          </div>
        </>
      ) : (
        <div className="w-full flex items-center justify-center">
          <p className="text-gray-400">Select a track to play</p>
        </div>
      )}
    </div>
  );
};

export default Player;