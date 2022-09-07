import React, { useEffect, useState } from "react";
import { useAuth } from "components/UserContext/UserContext";
import { useRouter } from "next/router";

const { NEXT_PUBLIC_SPOTIFY_CLIENT_ID } = process.env;

const LoginBanner = () => {
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
            <></>
          ) : (
            <button className="spotify-button" onClick={onClick}>
              Login to Spotify to save your playlist
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default LoginBanner;
