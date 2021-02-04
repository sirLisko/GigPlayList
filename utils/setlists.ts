import { Setlists, LegitSetlist, Set, Song, Track } from "types";

const normaliseSongTitle = (song: Song | Song[]) =>
  Array.isArray(song)
    ? song.map(({ name }: { name: string }) => name.toLowerCase())
    : song.name.toLowerCase();

export const getAggregatedSetlists = (setlists: Setlists): Track[] => {
  const legitSets = setlists.setlist.filter(
    ({ sets }) => sets !== ""
  ) as LegitSetlist[];
  const songList = legitSets.flatMap(({ sets: { set } }) =>
    Array.isArray(set)
      ? set.flatMap(({ song }: Set) => normaliseSongTitle(song))
      : [normaliseSongTitle(set.song)]
  ) as string[];
  return Object.entries<number>(
    songList.reduce(
      (acc: { [key: string]: number }, song) => ({
        ...acc,
        [song]: (acc[song] || 0) + 1,
      }),
      {}
    )
  )
    .sort((a, b) => b[1] - a[1])
    .map(([title, count]): Track => ({ title, count }));
};
