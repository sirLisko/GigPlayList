import React from "react";
import Head from "next/head";

import Favicons from "./Favicons";

const HeadSection = () => (
  <>
    <Head>
      <title>Should I Listen It - Best Guess for your Next Gig</title>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="author" content="Luca Lischetti" />
      <link
        type="text/plain"
        rel="author"
        href="https://shouldilisten.it/humans.txt"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <meta name="keywords" content="shouldilistenit, music, gig" />
      <meta
        name="description"
        content="Should I listen it set up you ready for your next Gig.It gives you the list of your favourite artists' most played tracks... in the last year of gigs."
      />
      <meta property="og:url" content="https://shouldilisten.it" />
      <meta
        property="og:description"
        content="Should I listen it set up you ready for your next Gig. It gives you the list of your favourite artists' most played tracks."
      />
      <meta
        property="og:title"
        content="Should I listen it - Best Guess for your Next Gig"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Pacifico|Open+Sans"
        rel="stylesheet"
        type="text/css"
      />
    </Head>
    <Favicons />
  </>
);

export default HeadSection;
