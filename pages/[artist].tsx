import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Audio as Loader } from "react-loader-spinner";

import Head from "components/Head/Head";
import Footer from "components/Footer/Footer";
import Events from "components/Events/Events";
import Search from "components/Search/Search";
import Tracks from "components/Tracks/Tracks";

import { Event, Track, Link } from "types";
import SavePlaylist from "components/SavePlaylist/SavePlaylist";

interface Error {
  status?: number;
}

const ResultPage = () => {
  const [tracks, setTracks] = useState<Track[]>();
  const [events, setEvents] = useState<Event[]>();
  const [links, setLinks] = useState<Link[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const router = useRouter();
  const artistName = router.query.artist as string;
  const getArtist = async (artist: string) => {
    setLoading(true);
    setTracks(undefined);
    setError(undefined);
    try {
      const { data } = await axios.get<Track[]>(`/api/artists/${artist}`);
      setTracks(data);
    } catch (e) {
      setError(e.response);
    }
    setLoading(false);
  };
  const getEvents = async (artist: string) => {
    setEvents(undefined);
    try {
      const { data } = await axios.get(`/api/events/${artist}`);
      setEvents(data);
    } catch (e) {
      // error
    }
  };
  const getTracks = async (artist: string) => {
    setLinks(undefined);
    try {
      const { data } = await axios.get(`/api/spotify/${artist}`);
      setLinks(data);
    } catch (e) {
      // error
    }
  };
  useEffect(() => {
    if (!artistName) return;
    getArtist(artistName);
    getEvents(artistName);
    getTracks(artistName);
  }, [artistName]);
  return (
    <div>
      <Head />
      <article className="list">
        <Search
          type="compact"
          placeholder="Search for ..."
          defaultValue={artistName}
        />
        {events && <Events events={events} />}
        {tracks && tracks.length > 0 && (
          <SavePlaylist tracks={tracks} links={links} artistName={artistName} />
        )}
        {tracks && tracks.length > 0 && (
          <Tracks tracks={tracks} links={links} />
        )}
        {loading && (
          <div className="loading">
            <Loader height={80} width={80} ariaLabel="loading" />
          </div>
        )}
        {error?.status === 404 && (
          <div className="error">
            <span>
              No setlists found for <b>{artistName}</b>
            </span>
          </div>
        )}
      </article>
      <Footer showCredits />
    </div>
  );
};

export default ResultPage;
