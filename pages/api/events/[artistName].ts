import type { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import { getClientIp } from "request-ip";

import { getArtistEvent } from "utils/apis/songkick";

import { Event } from "types";

export default async (req: NextApiRequest, res: NextApiResponse<Event[]>) => {
  const { artistName } = req.query as { artistName: string };
  if (!artistName) {
    return res.status(StatusCodes.BAD_REQUEST).end();
  }
  const clientIp = getClientIp(req);
  if (!clientIp) {
    return res.status(StatusCodes.NOT_FOUND).end();
  }
  try {
    const events = await getArtistEvent(artistName, clientIp);
    res.status(StatusCodes.OK).json(events);
  } catch (e) {
    res
      .status(e?.response?.data?.code ?? StatusCodes.INTERNAL_SERVER_ERROR)
      .end(e?.response?.data?.message || "Ops! There was a problem!");
  }
};
