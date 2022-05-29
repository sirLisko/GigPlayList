import { StatusCodes } from "http-status-codes";

import { getArtistSetlist } from "utils/apis/setlistFm";
import { getAggregatedSetlists } from "utils/setlists";

import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { artistName } = req.query as { artistName: string };
  if (!artistName) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
  try {
    const setList = await getArtistSetlist(artistName);
    res.status(StatusCodes.OK).json(getAggregatedSetlists(setList));
  } catch (e) {
    res
      .status(e?.response?.data?.code ?? StatusCodes.INTERNAL_SERVER_ERROR)
      .end(e?.response?.data?.message || "Ops! There was a problem!");
  }
};
