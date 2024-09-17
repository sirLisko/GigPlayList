import React from "react";

import Head from "components/Head/Head";
import Search from "components/Home/Search";
import HowItWorks from "components/Home/HowItWorks";
import Footer from "components/Footer/Footer";

const Home = () => {
  return (
    <div className="main-c min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-6 text-white">
      <Head />
      <h1 className="text-4xl font-bold mb-8 text-center">
        Prepare the playlist for your next gig!
      </h1>
      <Search />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Home;
