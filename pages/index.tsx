import React from "react";

import Head from "components/Head/Head";
import Footer from "components/Footer/Footer";
import Search from "components/Search/Search";

const Home = () => {
  return (
    <div className="container">
      <Head />
      <article className="main home">
        <header>Best Guess for your Next Gig</header>
        <Search type="empty" placeholder="Type-in an Artist" />
        <div className="howTo">
          <h3 className="howTo__title">How does it work?</h3>
          <ul>
            <li>
              It scans the last <em>20 gigs</em> of a given Artist
            </li>
            <li>does some Math (aggregate &amp; calculate)</li>
            <li>
              shows the <em>%</em> of the songs to be played.
            </li>
          </ul>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default Home;
