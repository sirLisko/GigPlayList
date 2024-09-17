import useSWR from "swr";
import { ArtistData } from "types";
import { fetcher } from "utils/api";

export const useArtistData = (artist: string | undefined) => {
  const { data, error, isLoading } = useSWR(
    artist ? `/api/artists/${artist}/spotify` : null,
    fetcher<ArtistData>,
  );

  return {
    artistData: data,
    isLoading,
    isError: error,
  };
};
