import useSWR from "swr";
import { Event } from "types";
import { fetcher } from "utils/api";

export const useEvents = (artist: string) => {
  const { data, error, isLoading } = useSWR(
    `/api/artists/${artist}/events`,
    fetcher<Event[]>,
  );

  return {
    events: data,
    isLoading,
    isError: error,
  };
};