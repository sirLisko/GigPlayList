import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

const Tracks = ({ tracks, links }) => (
  <div className="result">
    <ul>
      {tracks.map(({ count, title }) => {
        const props = {
          className: "track__title",
          "data-count": count,
        };
        const link = links?.find((link) => link.title === title)?.uri;
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
);

Tracks.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      uri: PropTypes.string.isRequired,
    })
  ),
};

export default Tracks;
