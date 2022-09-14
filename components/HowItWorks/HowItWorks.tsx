import React from "react";
import { MdLibraryMusic, MdSearch } from "react-icons/md";
import { ImMagicWand } from "react-icons/im";

import styles from "./HowItWorks.module.scss";

const HowItWorks = () => (
  <div className={styles.container}>
    <h3 className="howTo__title">How it works</h3>
    <ul role="list" className={styles.list}>
      <li>
        <MdSearch />
        <span>The search scans the last 20 gigs of the artist</span>
      </li>
      <li>
        <ImMagicWand />
        <span>
          Creates a setlist in order of likelyhood being played at their next
          gig based on the percentage of songs played at previous gigs
        </span>
      </li>
      <li>
        <MdLibraryMusic />
        <span>Save the list as a playlist!</span>
      </li>
    </ul>
  </div>
);

export default HowItWorks;
