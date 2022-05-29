import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

import { getArtistTracks } from "utils/apis/spotify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { artistName } = req.query as { artistName: string };
  if (!artistName) {
    res.status(StatusCodes.BAD_REQUEST).end();
  }
  try {
    const tracks = await getArtistTracks(artistName);
    res.status(StatusCodes.OK).json(tracks);
  } catch (e) {
    res
      .status(e?.response?.data?.code ?? StatusCodes.INTERNAL_SERVER_ERROR)
      .end(e?.response?.data?.message || "Ops! There was a problem!");
  }
};
