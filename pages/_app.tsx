import React from "react";
import type { AppProps } from "next/app";

import "assets/stylesheets/style.css";

import { AuthProvider } from "components/UserContext/UserContext";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
);

export default MyApp;
