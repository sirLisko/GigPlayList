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
}

export interface ArtistData {
  name: string;
  image: string | undefined;
  tracks: Link[];
}
