import { Link, Track } from "types";

export const isSameSong = (linkTitle: string, title: string) => {
  const song = linkTitle.toLowerCase();
  return song === title || song.split(" (feat. ")?.[0] === title;
};

export const matchSongs = (tracks: Track[], links: Link[]) =>
  tracks
    .map(
      ({ title }) => links?.find((link) => isSameSong(link.title, title))?.uri
    )
    .filter(Boolean) as string[];
