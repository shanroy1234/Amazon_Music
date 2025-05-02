import React, { createContext, useContext, useState, ReactNode } from 'react';
import { mockData } from '../data/mockData';
import { Track, Album, Playlist } from '../types';

interface AppContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  playlists: Playlist[];
  featuredPlaylists: Playlist[];
  savedAlbums: Album[];
  albums: Album[];
  newReleases: Album[];
  recommendedAlbums: Album[];
  allTracks: Track[];
  setCurrentTrack: (track: Track) => void;
  togglePlayPause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const {
    playlists,
    featuredPlaylists,
    savedAlbums,
    albums,
    newReleases,
    recommendedAlbums,
    allTracks,
  } = mockData;
  
  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };
  
  const findCurrentTrackIndex = (): { tracks: Track[], index: number } | null => {
    if (!currentTrack) return null;
    
    // Check if track is from a playlist
    if (currentTrack.playlist) {
      const playlist = playlists.find(p => p.id === currentTrack.playlist?.id);
      if (playlist && playlist.tracks) {
        const index = playlist.tracks.findIndex(t => t.id === currentTrack.id);
        if (index !== -1) {
          return { tracks: playlist.tracks, index };
        }
      }
    }
    
    // Check if track is from an album
    const album = albums.find(a => a.id === currentTrack.album.id);
    if (album && album.tracks) {
      const index = album.tracks.findIndex(t => t.id === currentTrack.id);
      if (index !== -1) {
        return { tracks: album.tracks, index };
      }
    }
    
    return null;
  };
  
  const nextTrack = () => {
    const trackInfo = findCurrentTrackIndex();
    if (!trackInfo) return;
    
    const { tracks, index } = trackInfo;
    if (index < tracks.length - 1) {
      const nextTrackItem = tracks[index + 1];
      setCurrentTrack(
        currentTrack?.playlist 
          ? { ...nextTrackItem, playlist: currentTrack.playlist }
          : nextTrackItem
      );
      setIsPlaying(true);
    }
  };
  
  const previousTrack = () => {
    const trackInfo = findCurrentTrackIndex();
    if (!trackInfo) return;
    
    const { tracks, index } = trackInfo;
    if (index > 0) {
      const prevTrackItem = tracks[index - 1];
      setCurrentTrack(
        currentTrack?.playlist 
          ? { ...prevTrackItem, playlist: currentTrack.playlist }
          : prevTrackItem
      );
      setIsPlaying(true);
    }
  };
  
  const handleSetCurrentTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };
  
  const contextValue: AppContextType = {
    currentTrack,
    isPlaying,
    playlists,
    featuredPlaylists,
    savedAlbums,
    albums,
    newReleases,
    recommendedAlbums,
    allTracks,
    setCurrentTrack: handleSetCurrentTrack,
    togglePlayPause,
    nextTrack,
    previousTrack,
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export default AppProvider;