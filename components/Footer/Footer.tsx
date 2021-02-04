import React from "react";
import PropTypes from "prop-types";

const Footer = ({ showCredits }) => (
  <footer>
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

Footer.propTypes = {
  showCredits: PropTypes.bool,
};

export default Footer;
