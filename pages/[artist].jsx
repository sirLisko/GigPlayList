import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Loader from "react-loader-spinner";

import Head from "components/Head/Head";
import Footer from "components/Footer/Footer";
import Events from "components/Events/Events";
import Search from "components/Search/Search";
import Tracks from "components/Tracks/Tracks";

const ResultPage = () => {
  const [tracks, setTracks] = useState();
  const [events, setEvents] = useState();
  const [links, setLinks] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const router = useRouter();
  const artistName = router.query.artist;
  const getArtist = async (artist) => {
    setLoading(true);
    setTracks();
    setError();
    try {
      const { data } = await axios.get(`/api/artists/${artist}`);
      setTracks(data);
    } catch (e) {
      setError(e.response);
    }
    setLoading();
  };
  const getEvents = async (artist) => {
    setEvents();
    try {
      const { data } = await axios.get(`/api/events/${artist}`);
      setEvents(data);
    } catch (e) {
      // error
    }
  };
  const getTracks = async (artist) => {
    setLinks();
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
    <div className="container">
      <Head />
      <article className="main list">
        <Search
          type="compact"
          placeholder="Search for ..."
          defaultValue={artistName}
        />
        {events && <Events events={events} />}
        {tracks && tracks.length > 0 && (
          <Tracks tracks={tracks} links={links} />
        )}
        {loading && (
          <Loader className="loading" type="Audio" height={80} width={80} />
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
