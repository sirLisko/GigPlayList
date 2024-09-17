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

export interface Link {
  title: string;
  uri: string;
  cover: string;
  previewUrl: string;
}

interface Palette {
  rgb: [number, number, number];
}

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
