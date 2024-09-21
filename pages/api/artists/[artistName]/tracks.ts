import { getArtistSetlist } from "server/apis/setlistFm";
import { getAggregatedSetlists } from "server/setlists";

import type { NextApiRequest, NextApiResponse } from "next";
import { HttpStatusCode } from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { artistName } = req.query as { artistName: string };
  if (!artistName) {
    return res.status(HttpStatusCode.BadRequest).end();
  }
  try {
    const setList = await getArtistSetlist(artistName);
    res.status(HttpStatusCode.Ok).json(getAggregatedSetlists(setList));
  } catch (e: any) {
    res
      .status(e?.response?.data?.code ?? HttpStatusCode.InternalServerError)
      .end(e?.response?.data?.message || "Ops! There was a problem!");
  }
};
