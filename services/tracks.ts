import useSWR from "swr";
import { Track } from "types";
import { fetcher } from "utils/api";

export const useTracks = (artistName?: string, artistId?: string) => {
  const { data, error, isLoading } = useSWR(
    artistId
      ? `/api/tracks?artistId=${artistId}`
      : artistName
        ? `/api/tracks?artistName=${artistName}`
        : null,
    fetcher<Track[]>,
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );

  return {
    tracks: data,
    isLoading,
    isError: error,
  };
};
