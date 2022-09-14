import React from "react";
import { useRouter } from "next/router";

import Head from "components/Head/Head";
import Result from "components/Result/Result";
import Footer from "components/Footer/Footer";

const ResultPage = () => {
  const router = useRouter();
  const artistName = router.query.artist as string;
  return (
    <div className="container">
      <Head />
      <Result artistName={artistName} />
      <Footer showCredits />
    </div>
  );
};

export default ResultPage;
