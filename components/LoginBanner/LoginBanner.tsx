import React, { useEffect, useState } from "react";
import { useAuth } from "components/UserContext/UserContext";
import { useRouter } from "next/router";

const { NEXT_PUBLIC_SPOTIFY_CLIENT_ID } = process.env;

import styles from "./LoginBanner.module.scss";

interface Props {
  onCreatePlaylist?: () => void;
}

const LoginBanner = ({ onCreatePlaylist }: Props) => {
  const [redirect, setRedirect] = useState<string>();
  const { user } = useAuth();
  const { isReady, asPath, push } = useRouter();
  useEffect(() => {
    const authEndpoint = "https://accounts.spotify.com/authorize";
    const clientId = NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirectUri = `${window.location.protocol}//${window.location.host}/auth`;
    const scopes = ["playlist-modify-public"];
    setRedirect(
      `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
        "%20"
      )}&response_type=token&show_dialog=true`
    );
  }, [isReady]);
  const onClick = () => {
    if (redirect) {
      localStorage.setItem("redirect", asPath);
      push(redirect);
    }
  };
  return (
    <div suppressHydrationWarning={true}>
      {redirect && (
        <>
          {user ? (
            <button className={styles.button} onClick={onCreatePlaylist}>
              Save your playlist to Spotify
            </button>
          ) : (
            <div className={styles.box}>
              <button className={styles.button} onClick={onClick}>
                Login to Spotify
              </button>
              <span>to save your playlist</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LoginBanner;
