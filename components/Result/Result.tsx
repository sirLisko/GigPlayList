import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Frown, TriangleAlert } from "lucide-react";
import duration from "humanize-duration";

import Events from "components/Events/Events";
import Tracks from "components/Tracks/Tracks";

import SavePlaylist from "components/SavePlaylist/SavePlaylist";

import { useArtistData } from "services/artistData";
import { useTracks } from "services/tracks";
import { useEvents } from "services/events";
import { useGetArtist } from "services/searchArtist";
import { matchSongs } from "utils/matchSongs";
import type { Link as LinkType, SetList } from "types";

interface Props {
  artistQuery: string[];
}

const sanitiseDate = (dateString: string) => {
  if (!dateString) return null;
  const [day, month, year] = dateString.split("-");
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

const calculatePlaylistDuration = (songs: LinkType[]) => {
  if (!songs.length) return 0;
  return duration(
    songs.reduce((acc, song) => acc + song.duration_ms, 0),
    { round: true, largest: 2 },
  );
};

const generateEncoreLabel = (data: SetList) => {
  const totalSetLists = data.totalSetLists;
  const encores = data.encores;
  console.log(encores);

  if (!encores || !Object.keys(encores).length) return null;

  const ordinalSuffix = (n: string) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = parseInt(n) % 100;
    return n + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };

  const encoreEntries = Object.entries(encores);

  const encoreLabels = encoreEntries.map(([encoreNumber, count]) => {
    const probability = ((count / totalSetLists) * 100).toFixed(0);
    return Object.entries(encoreEntries).length > 1
      ? `${ordinalSuffix(encoreNumber)} ${probability}%`
      : `${probability}%`;
  });

  return (
    <>
      <strong>Encore probability</strong>: {encoreLabels.join(", ")}
    </>
  );
};

const Result = ({ artistQuery }: Props) => {
  const [initialBaground] = useState<string>(document.body.style.background);
  const { artistData, isLoading: isLoadingArtist } = useArtistData(
    artistQuery[0],
  );
  const { data, isLoading: isLoadingTracks } = useTracks(
    artistQuery[0],
    artistQuery[1],
  );
  const { artist } = useGetArtist(artistQuery?.[1]);
  const { events } = useEvents(artistQuery[0]);

  const from = `rgba(${artistData?.palette?.DarkVibrant.rgb.join(",")},100)`;

  useEffect(() => {
    return () => {
      document.body.style.background = initialBaground;
    };
  }, []);

  useEffect(() => {
    document.body.style.background = from;
  }, [from]);

  if (isLoadingArtist || isLoadingTracks) {
    return null;
  }

  const isArtistiWithTrack =
    data?.tracks && data.tracks.length > 0 && artistData;

  const songs =
    artistData?.tracks && data?.tracks
      ? matchSongs(data.tracks, artistData.tracks)
      : [];

  const playlistDuration = calculatePlaylistDuration(songs);
  const encoreLabel = data && generateEncoreLabel(data);

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
            <button
              className="text-white hover:text-gray-300"
              aria-label="Go to homepage"
            >
              <ArrowLeft size={24} />
            </button>
          </Link>
          <h1 className="text-3xl font-bold">
            {isArtistiWithTrack && artistData?.name}
          </h1>
          <div className="w-6"></div>
        </header>
        {isArtistiWithTrack ? (
          <>
            <picture>
              <img
                src={artistData?.image}
                alt={artistData?.name}
                className="w-32 h-32 mx-auto mb-4 rounded-lg shadow-lg"
              />
            </picture>

            {events && <Events events={events} />}

            {artist?.["life-span"].ended && (
              <div className="bg-black bg-opacity-30 rounded-lg p-4 mb-6">
                <h2 className="text-xl font-semibold mb-2 flex gap-1">
                  <TriangleAlert /> Important notice
                </h2>
                <p>
                  Data may be inaccurate as this artist or band stopped
                  performing on{" "}
                  <strong>
                    {new Date(artist["life-span"].end).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                      },
                    )}
                  </strong>
                  .
                </p>
              </div>
            )}

            {songs && songs.length > 0 ? (
              <>
                <div className="bg-black bg-opacity-30 rounded-lg p-4 mb-6">
                  <h2 className="text-xl font-semibold mb-2">Playlist Info</h2>
                  <p>
                    Based on <strong>{data.totalTracks} songs</strong> from the
                    last <strong>{data.totalSetLists} concerts</strong> (
                    {sanitiseDate(data.from)?.toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                    })}{" "}
                    to{" "}
                    {sanitiseDate(data.to)?.toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                    })}
                    )
                  </p>
                  <p className="mt-2">
                    <strong>Average songs per concert</strong>:{" "}
                    {Math.round(data.totalTracks / data.totalSetLists)}
                  </p>
                  <p>{encoreLabel ? <p>{encoreLabel}</p> : null}</p>
                  <p className="mt-2">
                    <strong>{songs.length} songs</strong>{" "}
                    {playlistDuration ? (
                      <>
                        • Estimated playtime:{" "}
                        <strong>{playlistDuration}</strong>
                      </>
                    ) : null}
                  </p>
                </div>
                <SavePlaylist artistData={artistData} songs={songs} />
              </>
            ) : null}

            <Tracks
              tracks={data.tracks}
              links={artistData?.tracks}
              palette={artistData?.palette}
            />
          </>
        ) : (
          <div className="flex flex-col">
            <div className="m-auto text-center text-2xl p-3">
              <Frown height={100} width={100} />
            </div>
            <div className="m-auto text-center text-2xl p-3">
              No setlists found for <b>{artistQuery[0]}</b>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default Result;
