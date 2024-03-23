import React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const Document = () => (
  <Html lang="en">
    <Head>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto&display=swap"
        rel="stylesheet"
      />
      <Script
        async
        defer
        data-domain="gigplaylist.sirlisko.com"
        src="https://stats.sirlisko.com/js/script.js"
      ></Script>
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
