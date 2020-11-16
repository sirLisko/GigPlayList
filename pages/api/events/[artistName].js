import { getClientIp } from "request-ip";

import { getArtistEvent } from "utils/apis/songkick";

export default async (req, res) => {
  const {
    query: { artistName },
  } = req;
  try {
    const events = await getArtistEvent(artistName, getClientIp(req));
    res.status(200).json(events);
  } catch (e) {
    res
      .status(e?.response?.data?.code ?? 500)
      .end(e?.response?.data?.message || "Ops! There was a problem!");
  }
};
