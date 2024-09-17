import classNames from "classnames";
import React from "react";

interface FooterProps {
  className?: string;
  showCredits?: boolean;
}

const Footer = ({ className, showCredits }: FooterProps) => (
  <footer
    className={classNames(
      "text-sm text-muted-foreground pb-3 pt-10 text-center whitespace-nowrap",
      className,
    )}
  >
    <p>
      <span className="block sm:inline">
        Created with ❤ by{" "}
        <a
          className="underline"
          href="https://sirlisko.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          sirlisko
        </a>
        .
      </span>
      {showCredits && (
        <span>
          {" "}
          Thanks to <a href="https://setlist.fm">setlist.fm</a> API.
        </span>
      )}{" "}
      <span className="block sm:inline">
        View project source on{" "}
        <a
          className="underline"
          href="https://github.com/sirLisko/GigPlayList"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
        .
      </span>
    </p>
  </footer>
);

export default Footer;
