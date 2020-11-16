import { getArtistTracks } from "utils/apis/spotify";

export default async (req, res) => {
  const {
    query: { artistName },
  } = req;
  try {
    const tracks = await getArtistTracks(artistName);
    res.status(200).json(tracks);
  } catch (e) {
    res
      .status(e?.response?.data?.code ?? 500)
      .end(e?.response?.data?.message || "Ops! There was a problem!");
  }
};
