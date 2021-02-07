import { getArtistSetlist } from "utils/apis/setlistFm";
import { getAggregatedSetlists } from "utils/setlists";

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { artistName } = req.query as { artistName: string };
  if (!artistName) {
    return res.status(400).end();
  }
  try {
    const setList = await getArtistSetlist(artistName);
    res.status(200).json(getAggregatedSetlists(setList));
  } catch (e) {
    res
      .status(e?.response?.data?.code ?? 500)
      .end(e?.response?.data?.message || "Ops! There was a problem!");
  }
};
