import { getArtistSetlist } from "utils/apis/setlistFm";
import { getAggregatedSetlists } from "utils/setlists";

export default async (req, res) => {
  const {
    query: { artistName },
  } = req;
  try {
    const setList = await getArtistSetlist(artistName);
    res.status(200).json(getAggregatedSetlists(setList));
  } catch (e) {
    res.status(e.response.data.code).end(e.response.data.message);
  }
};
