export interface Event {
  date: string;
  venueName: string;
  location: string;
  buyUrl: string;
}

export interface Track {
  title: string;
  count: number;
}

export interface SetList {
  tracks: Track[];
  from: string;
  to: string;
  totalTracks: number;
  totalSetLists: number;
  encores?: Record<string, number>;
}

export interface Link {
  title: string;
  uri: string;
  cover: string;
  previewUrl: string;
  duration_ms: number;
}

interface Palette {
  rgb: [number, number, number];
}

// returned by Spotify
export interface ArtistData {
  name: string;
  image: string | undefined;
  tracks: Link[];
  palette?: {
    Vibrant: Palette;
    DarkVibrant: Palette;
    LightVibrant: Palette;
  };
}

// returned by MusicBrainz
export interface ArtistInfo {
  id: string;
  name: string;
  disambiguation: string;
  "life-span": {
    end: string;
    begin: string;
    ended: boolean;
  };
}
