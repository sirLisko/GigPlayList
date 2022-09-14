import React from "react";

interface FooterProps {
  showCredits?: boolean;
}

import styles from "./Footer.module.scss";

const Footer = ({ showCredits }: FooterProps) => (
  <footer className={styles.footer}>
    <p>
      <span>
        Created with &#9829; by{" "}
        <a href="https://sirlisko.com">Luca Lischetti (@sirLisko)</a>.
      </span>
      {showCredits && (
        <span>
          {" "}
          Thanks to <a href="https://setlist.fm">setlist.fm</a> API.
        </span>
      )}{" "}
      <span>
        View project source on{" "}
        <a href="https://github.com/sirLisko/shouldilistenit">Github</a>.
      </span>
    </p>
  </footer>
);

export default Footer;
