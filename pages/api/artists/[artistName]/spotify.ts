import { StatusCodes } from "http-status-codes";
import type { NextApiRequest, NextApiResponse } from "next";

import { getArtistTracks } from "server/apis/spotify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { artistName } = req.query as { artistName: string };
  if (!artistName) {
    res.status(StatusCodes.BAD_REQUEST).end();
  }
  try {
    const artistData = await getArtistTracks(artistName);
    res.status(StatusCodes.OK).json(artistData);
  } catch (e: any) {
    console.error(e);
    res
      .status(
        e?.response?.data?.code ??
          e?.status ??
          StatusCodes.INTERNAL_SERVER_ERROR,
      )
      .end(
        e?.response?.data?.message ?? e?.message ?? "Ops! There was a problem!",
      );
  }
};
