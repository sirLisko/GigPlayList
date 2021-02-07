import React from "react";
import type { AppProps } from "next/app";

import "assets/stylesheets/style.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default MyApp;
