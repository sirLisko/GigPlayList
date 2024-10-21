import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

const { NEXT_PUBLIC_ANALYTICS_ID } = process.env;

const Document = () => (
  <Html lang="en">
    <Head>
      {NEXT_PUBLIC_ANALYTICS_ID && (
        <script
          defer
          src="https://stats.sirlisko.com/script.js"
          data-website-id={NEXT_PUBLIC_ANALYTICS_ID}
        ></script>
      )}
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
