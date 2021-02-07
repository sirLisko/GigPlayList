import React from "react";
import cx from "classnames";

import { Track, Link } from "types";

interface TracksProps {
  tracks: Track[];
  links?: Link[];
}

const Tracks = ({ tracks, links }: TracksProps) => (
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

export default Tracks;
