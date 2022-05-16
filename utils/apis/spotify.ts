import SpotifyWebApi from "spotify-web-api-node";

const { SPOTIFY_ID, SPOTIFY_SECRET } = process.env;

var spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_ID,
  clientSecret: SPOTIFY_SECRET,
});

const getSongs = async (artist_name: string, offset: number = 0) => {
  const { body } = await spotifyApi.searchTracks(`artist:${artist_name}`, {
    limit: 50,
    offset,
  });
  return body?.tracks?.items?.map((track) => ({
    title: track.name.toLowerCase(),
    uri: track.uri,
  }));
};

export const getArtistTracks = async (artist_name: string) => {
  const {
    body: { access_token },
  } = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(access_token);

  const batch = await Promise.all([
    getSongs(artist_name, 0),
    getSongs(artist_name, 50),
  ]);
  return [...(batch?.[0] || []), ...(batch?.[1] || [])];
};