import React from "react";
import Head from "next/head";

import Favicons from "./Favicons";

const HeadSection = () => (
  <>
    <Head>
      <title>GigPlayList - Prepare the playlist for your next gig!</title>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="author" content="Luca Lischetti" />
      <link
        type="text/plain"
        rel="author"
        href="https://gigplaylist.sirlisko.com/humans.txt"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="keywords" content="gigplaylist, music, gig" />
      <meta
        name="description"
        content="GigPlayList set up you ready for your next Gig.It gives you the list of your favourite artists' most played tracks..."
      />
      <meta property="og:url" content="https://gigplaylist.sirlisko.com" />
      <meta
        property="og:description"
        content="GigPlayList set up you ready for your next Gig. It gives you the list of your favourite artists' most played tracks."
      />
      <meta
        property="og:title"
        content="GigPlayList - Prepare the playlist for your next gig!"
      />
      <script
        defer
        data-domain="gigplaylist.sirlisko.com"
        src="https://plausible.io/js/plausible.js"
      ></script>
    </Head>
    <Favicons />
  </>
);

export default HeadSection;
