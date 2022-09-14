import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Spotify from "spotify-web-api-js";
import { AuthUser, useAuth } from "components/UserContext/UserContext";
import { Audio as Loader } from "react-loader-spinner";
import LoginBanner from "components/LoginBanner/LoginBanner";
import Link from "next/link";

export const auth = () => {
  const hash = window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      if (item) {
        const parts = item.split("=") as [keyof AuthUser, string];
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {} as AuthUser);
  window.location.hash = "";
  return hash;
};

const Home = () => {
  const { isReady, push, query } = useRouter();
  const { setUser } = useAuth();
  useEffect(() => {
    const query = auth();
    if (query.access_token && setUser) {
      const s = new Spotify();
      s.setAccessToken(query.access_token);
      s.getMe().then((value) => {
        setUser(query, value);
        const redirect = localStorage.getItem("redirect") ?? "/";
        push(redirect);
      });
    }
  }, [isReady]);
  return (
    <div
      className="container"
      style={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {query.error ? (
        <div className="error">
          Ops, an error occured
          <div style={{ margin: "2rem" }}>
            <LoginBanner />
          </div>
          <div>
            <Link href={"/"} passHref>
              <a>Go back to the Home</a>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Home;
