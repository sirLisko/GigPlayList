import React from "react";

import Head from "components/Head/Head";
import Search from "components/Home/Search";
import HowItWorks from "components/Home/HowItWorks";
import Footer from "components/Footer/Footer";
import { backgroundGradient } from "assets/stylesheets/style";

const Home = () => {
  return (
    <main className={backgroundGradient}>
      <Head />
      <h1 className="text-4xl font-bold mb-8 text-center">
        Prepare the playlist for your next gig!
      </h1>
      <Search />
      <HowItWorks />
      <Footer />
    </main>
  );
};

export default Home;
