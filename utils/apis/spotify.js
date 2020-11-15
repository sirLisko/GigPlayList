import axios from "axios";

const URL = "https://api.spotify.com/v1/search";

const { SPOTIFY_TOKEN } = process.env;

export const getArtistTracks = async (artist_name) => {
  const { data } = await axios(URL, {
    headers: {
      Authorization: SPOTIFY_TOKEN,
    },
    params: {
      q: artist_name,
      type: "track",
      limit: 50,
    },
  });
  return data?.tracks?.items?.map((track) => ({
    artist: track.artists[0].name,
    title: track.name.toLowerCase(),
    uri: track.uri,
  }));
};
