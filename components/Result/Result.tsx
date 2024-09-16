import React, { useState, useEffect } from "react";
import axios from "axios";
import { Audio as Loader } from "react-loader-spinner";

import Events from "components/Events/Events";
import Tracks from "components/Tracks/Tracks";

import { Event, Track, ArtistData } from "types";
import SavePlaylist from "components/SavePlaylist/SavePlaylist";

import styles from "./Result.module.scss";

interface Error {
  status?: number;
}

interface Props {
  artistName: string;
}

const Result = ({ artistName }: Props) => {
  const [tracks, setTracks] = useState<Track[]>();
  const [events, setEvents] = useState<Event[]>();
  const [artistData, setArtistData] = useState<ArtistData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const getArtist = async (artist: string) => {
    setLoading(true);
    setTracks(undefined);
    setError(undefined);
    try {
      const { data } = await axios.get<Track[]>(
        `/api/artists/${artist}/tracks`
      );
      setTracks(data);
    } catch (e: any) {
      setError(e.response);
    }
    setLoading(false);
  };
  const getEvents = async (artist: string) => {
    setEvents(undefined);
    try {
      const { data } = await axios.get<Event[]>(
        `/api/artists/${artist}/events`
      );
      setEvents(data);
    } catch (e: any) {
      // error
    }
  };
  const getTracks = async (artist: string) => {
    setArtistData(undefined);
    try {
      const { data } = await axios.get<ArtistData>(
        `/api/artists/${artist}/spotify`
      );
      setArtistData(data);
    } catch (e: any) {
      // error
    }
  };
  useEffect(() => {
    if (!artistName) {
      return;
    }
    getArtist(artistName);
    getEvents(artistName);
    getTracks(artistName);
  }, [artistName]);
  return (
    <article>
      {tracks && tracks.length > 0 && artistData && (
        <SavePlaylist artistData={artistData} tracks={tracks} />
      )}
      {events && artistData && <Events events={events} />}
      {tracks && tracks.length > 0 && artistData && (
        <Tracks
          tracks={tracks}
          links={artistData?.tracks}
          palette={artistData?.palette}
        />
      )}
      {loading && (
        <div className={styles.loading}>
          <Loader height={80} width={80} ariaLabel="loading" />
        </div>
      )}
      {error?.status === 404 && (
        <div className={styles.error}>
          <span>
            No setlists found for <b>{artistName}</b>
          </span>
        </div>
      )}
    </article>
  );
};

export default Result;
