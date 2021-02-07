import axios from "axios";

const DOMAIN = "https://api.setlist.fm";
const PATH = "/rest/1.0/search/setlists?artistName=";

const headers = {
  Accept: "application/json",
  "x-api-key": process.env.SETLISTFMAPIKEY,
};

export const getArtistSetlist = async (artist: string) => {
  const { data } = await axios(`${DOMAIN}${PATH}${artist}`, {
    headers,
  });
  return data;
};
