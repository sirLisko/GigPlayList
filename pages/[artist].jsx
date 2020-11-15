import React, { useState, useEffect } from "react";
import cx from "classnames";
import { useRouter } from "next/router";
import axios from "axios";
import Loader from "react-loader-spinner";

import Head from "components/Head/Head";
import Footer from "components/Footer/Footer";
import Events from "components/Events/Events";
import Search from "components/Search/Search";

const ResultPage = ({ events }) => {
  const [tracks, setTracks] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const router = useRouter();
  const artistName = router.query.artist;
  const getArtist = async (artist) => {
    setLoading(true);
    setTracks();
    setError();
    console.log(artist);
    try {
      const { data } = await axios.get(`/api/artists/${artist}`);
      setTracks(data);
    } catch (e) {
      setError(e.response);
    }
    setLoading();
  };
  useEffect(() => {
    artistName && getArtist(artistName);
  }, [artistName]);
  return (
    <div className="container">
      <Head />
      <article className="main list">
        <Search
          type="compact"
          placeholder="Search for ..."
          defaultValue={artistName}
        />
        {events && <Events events={events} />}
        {tracks && tracks.length > 0 && (
          <div className="result">
            <ul>
              {tracks.map(({ link, count, title }) => {
                const props = {
                  className: "track__title",
                  "data-count": count,
                };
                return (
                  <li
                    key={title}
                    className={cx("track", { "track--link": Boolean(link) })}
                  >
                    {link ? (
                      <a href={link} {...props}>
                        {title}
                      </a>
                    ) : (
                      <p {...props}>{title}</p>
                    )}
                    <p
                      className="track__percentage"
                      style={{ opacity: count / tracks[0].count }}
                    ></p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {loading && (
          <Loader className="loading" type="Audio" height={80} width={80} />
        )}
        {error?.status === 404 && (
          <div className="error">
            <span>
              No setlists found for <b>{artistName}</b>
            </span>
          </div>
        )}
      </article>
      <Footer showCredits />
    </div>
  );
};

export default ResultPage;