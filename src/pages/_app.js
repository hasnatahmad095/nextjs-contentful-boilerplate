import React from "react";
import { AppProps } from "next/app";
import Layout from "./layout";
import "../fonts/fonts.css";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
