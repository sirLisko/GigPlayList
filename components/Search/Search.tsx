import React, { useRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useRouter } from "next/router";

const Search = ({ type, placeholder, defaultValue }) => {
  const search = useRef(null);
  const router = useRouter();
  const onFormSubmit = (e) => {
    e.preventDefault();
    search.current.value &&
      router.push("/[artist]", `/${search.current.value}`);
  };
  return (
    <>
      <form
        className={cx("search", {
          "search--compact": type === "compact",
          "search--empty": type === "empty",
        })}
        onSubmit={onFormSubmit}
      >
        <label htmlFor="search" className="sr-only">
          Search for an artist:
        </label>
        <input
          id="search"
          type="search"
          placeholder={placeholder}
          autoComplete="off"
          spellCheck="false"
          autoFocus={true}
          ref={search}
          defaultValue={defaultValue}
        />
        <button className="search__submit" type="submit">
          {">"}
        </button>
      </form>
    </>
  );
};

Search.propTypes = {
  type: PropTypes.oneOf(["compact", "empty"]),
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default Search;
