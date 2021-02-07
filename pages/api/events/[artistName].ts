import { getClientIp } from "request-ip";
import type { NextApiRequest, NextApiResponse } from "next";

import { getArtistEvent } from "utils/apis/songkick";

import { Event } from "types";

export default async (req: NextApiRequest, res: NextApiResponse<Event[]>) => {
  const { artistName } = req.query as { artistName: string };
  if (!artistName) {
    return res.status(400).end();
  }
  const clientIp = getClientIp(req);
  if (!clientIp) {
    return res.status(404).end();
  }
  try {
    const events = await getArtistEvent(artistName, clientIp);
    res.status(200).json(events);
  } catch (e) {
    res
      .status(e?.response?.data?.code ?? 500)
      .end(e?.response?.data?.message || "Ops! There was a problem!");
  }
};
