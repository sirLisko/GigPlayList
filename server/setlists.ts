import { JSONPath } from "jsonpath-plus";

import { SetList, Track } from "types";

export interface Song {
  name: string;
}

interface Set {
  "@encore"?: string;
  encore?: string;
  song: Song | Song[];
}

interface FaultySetlist {
  sets: "";
}

interface LegitSetlist {
  artist?: { name: string };
  sets: {
    set: Set | Set[];
  };
  eventDate: string;
}

type Setlist = LegitSetlist | FaultySetlist;

export interface Setlists {
  setlist: Setlist[];
}

const normaliseSongTitle = (song: Song | Song[]) =>
  Array.isArray(song)
    ? song.map(({ name }: { name: string }) => name.toLowerCase())
    : [song.name.toLowerCase()];

const isLegitSetlist = (setlist: Setlist): setlist is LegitSetlist =>
  setlist.sets !== "" &&
  (Array.isArray(setlist.sets.set)
    ? setlist.sets.set.length > 0 && Array.isArray(setlist.sets.set[0].song)
      ? setlist.sets.set[0].song.length > 0
      : false
    : true);

export const getAggregatedSetlists = (setlists: Setlists): SetList => {
  const legitSets = setlists.setlist.filter(isLegitSetlist);
  const songList = legitSets.flatMap(({ sets: { set } }) => [
    ...new Set(
      Array.isArray(set)
        ? set.flatMap(({ song }: Set) => normaliseSongTitle(song))
        : normaliseSongTitle(set.song),
    ),
  ]);

  const tracks = Object.entries<number>(
    songList
      .filter((song) => song.length > 0)
      .reduce(
        (acc: { [key: string]: number }, song) => ({
          ...acc,
          [song]: (acc[song] || 0) + 1,
        }),
        {},
      ),
  )
    .sort((a, b) => b[1] - a[1])
    .map(([title, count]): Track => ({ title, count }));

  return {
    tracks,
    totalSetLists: legitSets.length,
    totalTracks: tracks.reduce((acc, track) => acc + track.count, 0),
    to: legitSets?.[0].eventDate,
    from: legitSets?.[legitSets.length - 1].eventDate,
    encores: JSONPath({ json: setlists, path: "$..`@encore,encore" }).reduce(
      (acc: Required<SetList>["encores"], item: string) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      },
      {},
    ),
  };
};
