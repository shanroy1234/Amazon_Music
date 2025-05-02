export interface Album {
  id: string;
  name: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  tracks?: Track[];
}

export interface Playlist {
  id: string;
  name: string;
  creator: string;
  imageUrl: string;
  description?: string;
  tracks?: Track[];
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: {
    id: string;
    name: string;
    imageUrl: string;
  };
  duration: number;
  previewUrl: string;
  playlist?: Playlist;
}