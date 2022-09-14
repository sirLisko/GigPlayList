import React from "react";
import Head from "next/head";

import Favicons from "./Favicons";

const HeadSection = () => (
  <>
    <Head>
      <title>
        Should I Listen To It - Prepare the playlist for your next gig!
      </title>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="author" content="Luca Lischetti" />
      <link
        type="text/plain"
        rel="author"
        href="https://shouldilisten.it/humans.txt"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="keywords" content="shouldilistenit, music, gig" />
      <meta
        name="description"
        content="Should I listen to it set up you ready for your next Gig.It gives you the list of your favourite artists' most played tracks..."
      />
      <meta property="og:url" content="https://shouldilisten.it" />
      <meta
        property="og:description"
        content="Should I listen to it set up you ready for your next Gig. It gives you the list of your favourite artists' most played tracks."
      />
      <meta
        property="og:title"
        content="Should I listen to it - Prepare the playlist for your next gig!"
      />
    </Head>
    <Favicons />
  </>
);

export default HeadSection;
