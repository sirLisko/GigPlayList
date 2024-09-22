import { HttpStatusCode } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { getClientIp } from "request-ip";

import { getArtistEvent } from "server/apis/songkick";

import { Event } from "types";

export default async (req: NextApiRequest, res: NextApiResponse<Event[]>) => {
  const { artistName } = req.query as { artistName: string };
  if (!artistName) {
    return res.status(HttpStatusCode.BadRequest).end();
  }
  const clientIp = getClientIp(req);
  if (!clientIp) {
    return res.status(HttpStatusCode.NotFound).end();
  }
  if (clientIp === "::1") {
    return res.status(HttpStatusCode.NoContent).end();
  }
  try {
    const events = await getArtistEvent(artistName, clientIp);
    res.status(HttpStatusCode.Ok).json(events);
  } catch (e: any) {
    res
      .status(e?.response?.data?.code ?? HttpStatusCode.InternalServerError)
      .end(e?.response?.data?.message || "Ops! There was a problem!");
  }
};
