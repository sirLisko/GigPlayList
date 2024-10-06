import { Link, Track } from "types";

export const normalizeSong = (str: string) =>
  str
    .normalize("NFD") // Decompose accents
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-zA-Z0-9\s]/g, "") // Remove special characters
    .toLowerCase(); // Convert to lowercase for case-insensitive comparison

export const isSameSong = (linkTitle: string, title: string) => {
  const song = normalizeSong(linkTitle);
  const normalizedTitle = normalizeSong(title);
  return (
    song === normalizedTitle ||
    normalizeSong(linkTitle.split(" - ")?.[0]) === normalizedTitle ||
    normalizeSong(linkTitle.split(" (feat. ")?.[0]) === normalizedTitle
  );
};

export const matchSongs = (tracks: Track[], links: Link[]): Link[] =>
  tracks
    .map(({ title }) => links.find((link) => isSameSong(link.title, title)))
    .filter((link) => Boolean(link?.uri)) as Link[];
