import React, { useEffect } from "react";

import Events from "components/Events/Events";
import Tracks from "components/Tracks/Tracks";

import SavePlaylist from "components/SavePlaylist/SavePlaylist";

import { useArtistData } from "services/artistData";
import { useTracks } from "services/tracks";
import { useEvents } from "services/events";
import { ArrowLeft, Frown } from "lucide-react";
import Link from "next/link";

interface Props {
  artistName: string;
}

const Result = ({ artistName }: Props) => {
  const {
    artistData,
    isLoading: isLoadingArtist,
    isError: artistError,
  } = useArtistData(artistName);
  const {
    tracks,
    isError: trackError,
    isLoading: isLoadingTracks,
  } = useTracks(artistName);
  const { events } = useEvents(artistName);

  const from = `rgba(${artistData?.palette?.DarkVibrant.rgb.join(",")},100)`;

  useEffect(() => {
    document.body.style.background = from;
    return () => {
      document.body.style.background = "";
    };
  }, [from]);

  if (isLoadingArtist || isLoadingTracks) {
    return null;
  }

  return (
    <article
      className="min-h-screen bg-gradient-to-b to-black text-white p-6"
      style={
        {
          "--tw-gradient-from": from,
          "--tw-gradient-stops": `var(--tw-gradient-from), var(--tw-gradient-to)`,
        } as React.CSSProperties
      }
    >
      <div className="w-full max-w-2xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <Link href="/" passHref>
            <button className="text-white hover:text-gray-300">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <h1 className="text-3xl font-bold">{artistData?.name}</h1>
          <div className="w-6"></div>
        </header>

        {artistData && (
          <picture>
            <img
              src={artistData?.image}
              alt={artistData?.name}
              className="w-32 h-32 mx-auto mb-4 rounded-lg shadow-lg"
            />
          </picture>
        )}

        {events && artistData && <Events events={events} />}

        {/* <div className="bg-black bg-opacity-30 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-2">Playlist Info</h2>
          <p>Based on last 20 concerts from 2022 to 2024</p>
          <p>13 songs • Estimated playtime: 65 minutes</p>
        </div> */}

        {tracks && tracks.length > 0 && artistData && (
          <SavePlaylist artistData={artistData} tracks={tracks} />
        )}

        {tracks && tracks.length > 0 && artistData && (
          <Tracks
            tracks={tracks}
            links={artistData?.tracks}
            palette={artistData?.palette}
          />
        )}
        {(artistError || trackError) && (
          <div className="flex flex-col">
            <div className="m-auto text-center text-2xl p-3">
              <Frown height={100} width={100} />
            </div>
            <div className="m-auto text-center text-2xl p-3">
              No setlists found for <b>{artistName}</b>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default Result;
