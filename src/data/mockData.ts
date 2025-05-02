import { Album, Playlist, Track } from '../types';

// Generate mock albums
const generateAlbums = (): Album[] => {
  return [
    {
      id: 'a1',
      name: 'Future Nostalgia',
      artist: 'Dua Lipa',
      imageUrl: 'https://images.pexels.com/photos/1656665/pexels-photo-1656665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      releaseYear: 2020,
      tracks: []
    },
    {
      id: 'a2',
      name: 'Planet Her',
      artist: 'Doja Cat',
      imageUrl: 'https://images.pexels.com/photos/2426085/pexels-photo-2426085.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      releaseYear: 2021,
      tracks: []
    },
    {
      id: 'a3',
      name: 'When We All Fall Asleep, Where Do We Go?',
      artist: 'Billie Eilish',
      imageUrl: 'https://images.pexels.com/photos/3255761/pexels-photo-3255761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      releaseYear: 2019,
      tracks: []
    },
    {
      id: 'a4',
      name: 'SOUR',
      artist: 'Olivia Rodrigo',
      imageUrl: 'https://images.pexels.com/photos/1413550/pexels-photo-1413550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      releaseYear: 2021,
      tracks: []
    },
    {
      id: 'a5',
      name: 'Chromatica',
      artist: 'Lady Gaga',
      imageUrl: 'https://images.pexels.com/photos/1616470/pexels-photo-1616470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      releaseYear: 2020,
      tracks: []
    },
    {
      id: 'a6',
      name: 'After Hours',
      artist: 'The Weeknd',
      imageUrl: 'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      releaseYear: 2020,
      tracks: []
    },
    {
      id: 'a7',
      name: '30',
      artist: 'Adele',
      imageUrl: 'https://images.pexels.com/photos/2917442/pexels-photo-2917442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      releaseYear: 2021,
      tracks: []
    },
    {
      id: 'a8',
      name: 'Fine Line',
      artist: 'Harry Styles',
      imageUrl: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      releaseYear: 2019,
      tracks: []
    },
    {
      id: 'a9',
      name: 'Montero',
      artist: 'Lil Nas X',
      imageUrl: 'https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      releaseYear: 2021,
      tracks: []
    },
    {
      id: 'a10',
      name: 'Certified Lover Boy',
      artist: 'Drake',
      imageUrl: 'https://images.pexels.com/photos/2191013/pexels-photo-2191013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      releaseYear: 2021,
      tracks: []
    },
  ];
};

// Generate mock playlists
const generatePlaylists = (): Playlist[] => {
  return [
    {
      id: 'p1',
      name: 'Today\'s Top Hits',
      creator: 'Amazon Music',
      imageUrl: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'The most popular tracks right now',
      tracks: []
    },
    {
      id: 'p2',
      name: 'Chill Vibes',
      creator: 'Amazon Music',
      imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Relax and unwind with these smooth tracks',
      tracks: []
    },
    {
      id: 'p3',
      name: 'Workout Mix',
      creator: 'Amazon Music',
      imageUrl: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Energy-boosting tracks for your exercise routine',
      tracks: []
    },
    {
      id: 'p4',
      name: 'Indie Mix',
      creator: 'Amazon Music',
      imageUrl: 'https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Discover the best independent artists',
      tracks: []
    },
    {
      id: 'p5',
      name: 'Throwback Hits',
      creator: 'Amazon Music',
      imageUrl: 'https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Classic tracks from the past decades',
      tracks: []
    },
    {
      id: 'p6',
      name: 'My Playlist #1',
      creator: 'User',
      imageUrl: 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      tracks: []
    },
  ];
};

// Generate mock tracks
const generateTracks = (albums: Album[], playlists: Playlist[]): Track[] => {
  const tracksList: Track[] = [];
  
  const albumTracks = [
    // Tracks for album a1 - Future Nostalgia by Dua Lipa
    [
      { id: 't1', title: 'Don\'t Start Now', duration: 183 },
      { id: 't2', title: 'Physical', duration: 194 },
      { id: 't3', title: 'Levitating', duration: 203 },
      { id: 't4', title: 'Break My Heart', duration: 221 },
      { id: 't5', title: 'Hallucinate', duration: 211 },
    ],
    // Tracks for album a2 - Planet Her by Doja Cat
    [
      { id: 't6', title: 'Kiss Me More', duration: 228 },
      { id: 't7', title: 'Need to Know', duration: 210 },
      { id: 't8', title: 'Woman', duration: 172 },
      { id: 't9', title: 'Get Into It (Yuh)', duration: 138 },
      { id: 't10', title: 'You Right', duration: 186 },
    ],
    // Tracks for album a3 - When We All Fall Asleep, Where Do We Go? by Billie Eilish
    [
      { id: 't11', title: 'Bad Guy', duration: 194 },
      { id: 't12', title: 'Bury a Friend', duration: 193 },
      { id: 't13', title: 'When the Party\'s Over', duration: 196 },
      { id: 't14', title: 'All the Good Girls Go to Hell', duration: 168 },
      { id: 't15', title: 'Wish You Were Gay', duration: 221 },
    ],
    // Tracks for album a4 - SOUR by Olivia Rodrigo
    [
      { id: 't16', title: 'Drivers License', duration: 242 },
      { id: 't17', title: 'Good 4 U', duration: 178 },
      { id: 't18', title: 'Deja Vu', duration: 215 },
      { id: 't19', title: 'Traitor', duration: 229 },
      { id: 't20', title: 'Brutal', duration: 143 },
    ],
    // Tracks for other albums (just a few tracks per album)
    [
      { id: 't21', title: 'Rain On Me', duration: 182 },
      { id: 't22', title: 'Stupid Love', duration: 198 },
    ],
    [
      { id: 't23', title: 'Blinding Lights', duration: 200 },
      { id: 't24', title: 'Save Your Tears', duration: 215 },
    ],
    [
      { id: 't25', title: 'Easy On Me', duration: 224 },
      { id: 't26', title: 'Oh My God', duration: 225 },
    ],
    [
      { id: 't27', title: 'Watermelon Sugar', duration: 174 },
      { id: 't28', title: 'Adore You', duration: 207 },
    ],
    [
      { id: 't29', title: 'MONTERO (Call Me By Your Name)', duration: 138 },
      { id: 't30', title: 'INDUSTRY BABY', duration: 212 },
    ],
    [
      { id: 't31', title: 'Way 2 Sexy', duration: 226 },
      { id: 't32', title: 'Fair Trade', duration: 251 },
    ],
  ];
  
  // Assign tracks to albums
  albums.forEach((album, index) => {
    const albumTrackList = albumTracks[index] || [];
    const tracks = albumTrackList.map(trackInfo => {
      const track: Track = {
        id: trackInfo.id,
        title: trackInfo.title,
        artist: album.artist,
        album: {
          id: album.id,
          name: album.name,
          imageUrl: album.imageUrl,
        },
        duration: trackInfo.duration,
        previewUrl: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3', // Mock preview URL
      };
      
      tracksList.push(track);
      return track;
    });
    
    album.tracks = tracks;
  });
  
  // Assign tracks to playlists (randomly)
  playlists.forEach(playlist => {
    // Randomly select 8-15 tracks for each playlist
    const trackCount = Math.floor(Math.random() * 8) + 8;
    const playlistTracks: Track[] = [];
    
    for (let i = 0; i < trackCount; i++) {
      const randomTrack = tracksList[Math.floor(Math.random() * tracksList.length)];
      if (!playlistTracks.find(track => track.id === randomTrack.id)) {
        playlistTracks.push({...randomTrack});
      }
    }
    
    playlist.tracks = playlistTracks;
  });
  
  return tracksList;
};

// Create mock data
const albums = generateAlbums();
const playlists = generatePlaylists();
const allTracks = generateTracks(albums, playlists);

// More specific groups for the UI
const newReleases = albums.slice(0, 6);
const recommendedAlbums = [albums[3], albums[5], albums[7], albums[2], albums[9], albums[0]];
const featuredPlaylists = playlists.slice(0, 5);
const savedAlbums = [albums[0], albums[2], albums[5]];

export const mockData = {
  albums,
  playlists,
  allTracks,
  newReleases,
  recommendedAlbums,
  featuredPlaylists,
  savedAlbums,
};