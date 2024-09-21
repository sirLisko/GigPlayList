import React from "react";
import { useRouter } from "next/router";
import { Audio as Loader } from "react-loader-spinner";

import Head from "components/Head/Head";
import Result from "components/Result/Result";
import Footer from "components/Footer/Footer";
import { useArtistData } from "services/artistData";
import classNames from "classnames";
import { useTracks } from "services/tracks";

const ResultPage = () => {
  const router = useRouter();
  const artist = router.query.artist as string[] | undefined;

  const { isLoading: isLoadingArtist } = useArtistData(artist?.[0]);
  const { isLoading: isLoadingTracks } = useTracks(artist?.[0], artist?.[1]);
  const isLoading = isLoadingArtist || isLoadingTracks;
  const showAlternate = isLoading || !artist;

  return (
    <main
      className={classNames("min-h-screen", {
        "main-c bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-6 text-white":
          showAlternate,
      })}
    >
      <Head />
      {isLoading || !artist ? (
        <div className="m-auto text-center text-2xl p-3" aria-label="lo">
          <Loader height={80} width={80} ariaLabel="loading" color="white" />
        </div>
      ) : (
        <Result artist={artist} />
      )}
      {!isLoading && (
        <Footer
          showCredits
          className={classNames("text-white", {
            "bg-black": !showAlternate,
          })}
        />
      )}
    </main>
  );
};

export default ResultPage;