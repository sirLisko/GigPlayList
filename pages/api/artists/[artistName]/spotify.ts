import { HttpStatusCode } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { getArtistTracks } from "server/apis/spotify";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { artistName } = req.query as { artistName: string };
  if (!artistName) {
    res.status(HttpStatusCode.BadRequest).end();
  }
  try {
    const artistData = await getArtistTracks(artistName);
    res.status(HttpStatusCode.Ok).json(artistData);
  } catch (e: any) {
    res
      .status(
        e?.response?.data?.code ??
          e?.status ??
          HttpStatusCode.InternalServerError,
      )
      .end(
        e?.response?.data?.message ?? e?.message ?? "Ops! There was a problem!",
      );
  }
};
