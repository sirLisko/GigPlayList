export interface Event {
  date: string;
  venueName: string;
  location: string;
  buyUrl: string;
}

export interface Song {
  name: string;
}

export interface Set {
  "@encore"?: string;
  song: Song | Song[];
}

interface FaultySetlist {
  sets: "";
}

export interface LegitSetlist {
  artist?: { name: string };
  sets: {
    set: Set | Set[];
  };
}

export type Setlist = LegitSetlist | FaultySetlist;

export interface Setlists {
  setlist: Setlist[];
}

export interface Track {
  title: string;
  count: number;
}

export interface Link {
  title: string;
  uri: string;
}
