import SpotifyWebApi from "spotify-web-api-node";

const { SPOTIFY_ID, SPOTIFY_SECRET } = process.env;

var spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_ID,
  clientSecret: SPOTIFY_SECRET,
});

export const getArtistTracks = async (artist_name: string) => {
  const {
    body: { access_token },
  } = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(access_token);
  const { body } = await spotifyApi.searchTracks(`artist:${artist_name}`, {
    limit: 50,
  });
  return body?.tracks?.items?.map((track) => ({
    title: track.name.toLowerCase(),
    uri: track.uri,
  }));
};
