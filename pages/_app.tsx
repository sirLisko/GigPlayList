import React from "react";
import type { AppProps } from "next/app";

import "assets/stylesheets/style.scss";

import { AuthProvider } from "components/UserContext/UserContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
};

export default MyApp;
