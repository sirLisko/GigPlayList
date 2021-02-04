import type { NextApiRequest, NextApiResponse } from "next";

import { getArtistTracks } from "utils/apis/spotify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { artistName } = req.query as { artistName: string };
  if (!artistName) {
    res.status(400).end();
  }
  try {
    const tracks = await getArtistTracks(artistName);
    res.status(200).json(tracks);
  } catch (e) {
    res
      .status(e?.response?.data?.code ?? 500)
      .end(e?.response?.data?.message || "Ops! There was a problem!");
  }
};
