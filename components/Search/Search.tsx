import React, { useRef, FormEvent } from "react";
import cx from "classnames";
import { useRouter } from "next/router";

interface SearchProps {
  type: "compact" | "empty";
  placeholder: string;
  defaultValue?: string;
}

const Search = ({ type, placeholder, defaultValue }: SearchProps) => {
  const search = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search.current?.value &&
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

export default Search;
