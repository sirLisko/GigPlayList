import SpotifyWebApi from "spotify-web-api-node";
import Vibrant from "node-vibrant";

const { NEXT_PUBLIC_SPOTIFY_CLIENT_ID, SPOTIFY_SECRET } = process.env;

const spotifyApi = new SpotifyWebApi({
  clientId: NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_SECRET,
});

const getArtistInfo = async (artistName: string) => {
  const { body } = await spotifyApi.searchArtists(artistName);
  const artist =
    body.artists?.items.find(
      ({ name }) => name.toLowerCase() === artistName.toLocaleLowerCase()
    ) || body.artists?.items[0];
  const image = artist?.images[0].url;
  const palette = image && (await Vibrant.from(image).getPalette());
  return {
    image: image,
    name: artist?.name,
    palette,
  };
};

const getSongs = async (artistName: string, offset = 0) => {
  const { body } = await spotifyApi.searchTracks(`artist:${artistName}`, {
    limit: 50,
    offset,
  });
  return body?.tracks?.items?.map((track) => ({
    title: track.name.toLowerCase(),
    uri: track.uri,
  }));
};

export const getArtistTracks = async (artistName: string) => {
  const {
    body: { access_token },
  } = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(access_token);

  const batch = await Promise.all([
    getSongs(artistName, 0),
    getSongs(artistName, 50),
    getArtistInfo(artistName),
  ]);
  return {
    ...batch[2],
    tracks: [...(batch?.[0] || []), ...(batch?.[1] || [])],
  };
};
