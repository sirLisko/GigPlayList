import React from "react";
import cx from "classnames";

import { Track, Link, ArtistData } from "types";
import { isSameSong } from "utils/matchSongs";

import styles from "./Track.module.scss";

interface TracksProps {
  tracks: Track[];
  links?: Link[];
  palette?: ArtistData["palette"];
}

const Tracks = ({ tracks, links, palette }: TracksProps) => (
  <div className={styles.container}>
    <ul role="list" className={styles.list}>
      {tracks.map(({ count, title }) => {
        const props = {
          className: styles.title,
          "data-count": count,
        };
        const link = links?.find((link) => isSameSong(link.title, title))?.uri;
        return (
          <li
            key={title}
            className={cx(styles.track, { [styles.link]: Boolean(link) })}
          >
            {link ? (
              <a href={link} {...props}>
                {title}
              </a>
            ) : (
              <p {...props}>{title}</p>
            )}
            <p
              className={styles.percentage}
              style={{
                backgroundColor: `rgb(${palette?.Vibrant.rgb.join(", ")})`,
                opacity: count / tracks[0].count,
              }}
            ></p>
          </li>
        );
      })}
    </ul>
  </div>
);

export default Tracks;
