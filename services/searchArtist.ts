import useSWR from "swr";
import { ArtistInfo } from "types";
import { fetcher } from "utils/api";

export type SearchResults = {
  artists: ArtistInfo[];
};

export const useSearchArtistByName = (searchTerm: string | undefined) => {
  const { data, error, isLoading } = useSWR(
    searchTerm && searchTerm.length > 1
      ? `https://musicbrainz.org/ws/2/artist?query=${encodeURIComponent(searchTerm)}&fmt=json`
      : null,
    fetcher<SearchResults>,
    {
      dedupingInterval: 300,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    data,
    isLoading,
    isError: error,
  };
};

export const useGetArtist = (mbid: string | undefined) => {
  const { data, error, isLoading } = useSWR(
    mbid ? `https://musicbrainz.org/ws/2/artist/${mbid}?fmt=json` : null,
    fetcher<ArtistInfo>,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    artist: data,
    isLoading,
    isError: error,
  };
};
