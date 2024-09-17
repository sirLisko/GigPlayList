import useSWR from "swr";
import { Track } from "types";
import { fetcher } from "utils/api";

export const useTracks = (artist?: string) => {
  const { data, error, isLoading } = useSWR(
    artist ? `/api/artists/${artist}/tracks` : null,
    fetcher<Track[]>,
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );

  return {
    tracks: data,
    isLoading,
    isError: error,
  };
};
