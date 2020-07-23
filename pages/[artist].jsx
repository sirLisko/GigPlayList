import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import { getArtistSetlist } from "utils/apis/setlistFm";
import { getAggregatedSetlists } from "utils/setlists";

import Head from "components/Head/Head";
import Footer from "components/Footer/Footer";
import Events from "components/Events/Events";
import Search from "components/Search/Search";

const ResultPage = ({ artist, events, tracks, error }) => {
  return (
    <div className="container">
      <Head />
      <article className="main list">
        <Search
          type="compact"
          placeholder="Search for ..."
          defaultValue={artist}
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
        {error === 404 && (
          <div className="error">
            <span>
              No setlists found for <b>{artist}</b>
            </span>
          </div>
        )}
      </article>
      <Footer showCredits />
    </div>
  );
};

ResultPage.propTypes = {
  artist: PropTypes.string.isRequired,
  events: PropTypes.array,
  tracks: PropTypes.array,
  error: PropTypes.number,
};

export async function getServerSideProps({ query }) {
  const { artist } = query;
  try {
    const { data } = await getArtistSetlist(artist);
    return {
      props: {
        artist,
        tracks: data && getAggregatedSetlists(data),
      },
    };
  } catch (e) {
    return {
      props: {
        artist,
        error: e.response.status,
      },
    };
  }
}

export default ResultPage;
