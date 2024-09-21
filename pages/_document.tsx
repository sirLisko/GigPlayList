import React from "react";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const Document = () => (
  <Html lang="en">
    <Head>
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
