import React from "react";

import Head from "components/Head/Head";
import Header from "components/Header/Header";
import Search from "components/Search/Search";
import HowItWorks from "components/HowItWorks/HowItWorks";
import Footer from "components/Footer/Footer";

const Home = () => {
  return (
    <div className="container">
      <Head />
      <article>
        <Header />
        <Search />
        <HowItWorks />
      </article>
      <Footer />
    </div>
  );
};

export default Home;
