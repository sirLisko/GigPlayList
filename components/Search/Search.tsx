import React, { useRef, FormEvent } from "react";
import { useRouter } from "next/router";
import { MdSearch } from "react-icons/md";

import styles from "./Search.module.scss";

const Search = () => {
  const search = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search.current?.value &&
      router.push("/[artist]", `/${search.current.value}`);
  };
  return (
    <>
      <form className={styles.container} onSubmit={onFormSubmit}>
        <label htmlFor="search" className="sr-only">
          Search for an artist:
        </label>
        <input
          id="search"
          type="search"
          placeholder="Search an Artist"
          autoComplete="off"
          spellCheck="false"
          autoFocus={true}
          ref={search}
        />
        <button className={styles.submit} type="submit">
          <MdSearch />
        </button>
      </form>
    </>
  );
};

export default Search;
