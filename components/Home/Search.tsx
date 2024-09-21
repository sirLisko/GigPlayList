import React, { useRef, FormEvent } from "react";
import { useRouter } from "next/router";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const search = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search.current?.value &&
      router.push("/[artist]", `/${search.current.value}`);
  };
  return (
    <form className="w-full max-w-md mb-12" onSubmit={onFormSubmit}>
      <div className="relative">
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
          className="w-full py-3 px-4 pr-12 rounded-full bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-white placeholder-opacity-75 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
          type="submit"
          aria-labelledby="search"
        >
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default Search;
