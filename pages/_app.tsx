import React from "react";
import PropTypes from "prop-types";

import "../assets/stylesheets/style.scss";

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape({}),
};

export default MyApp;
