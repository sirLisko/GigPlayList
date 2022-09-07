import axios from "axios";

const DOMAIN = "https://api.setlist.fm";
const ARTIST_PATH = "/rest/1.0/search/artists?sort=relevance&artistName=";
const SETLIST_PATH = "/rest/1.0/search/setlists?artistMbid=";

const headers = {
  Accept: "application/json",
  "x-api-key": process.env.SETLISTFMAPIKEY as string,
};

export const getArtistSetlist = async (artist: string) => {
  const { data: artistData } = await axios(`${DOMAIN}${ARTIST_PATH}${artist}`, {
    headers,
  });
  const { data } = await axios(
    `${DOMAIN}${SETLIST_PATH}${artistData?.artist?.[0].mbid}`,
    {
      headers,
    }
  );
  return data;
};
