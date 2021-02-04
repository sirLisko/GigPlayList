import axios from "axios";

const URL = "http://api.songkick.com/api/3.0/events.json";

const { SKAPI } = process.env;

export const getArtistEvent = async (artist_name, ip) => {
  const { data } = await axios(URL, {
    params: {
      artist_name,
      location: `ip:${ip}`,
      apikey: SKAPI,
    },
  });
  return data?.resultsPage?.results?.event?.map((event) => ({
    artist: event.performance[0].artist.displayName,
    buyUrl: event.uri,
    date: event.start.datetime,
    venueName: event.venue.displayName,
    location: event.location.city,
  }));
};
