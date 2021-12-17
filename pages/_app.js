import Head from "next/head";
import Router from "next/router";

import React, { useState, useEffect } from "react";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import "../styles/globals.css";

import ProgressBar from "@badrap/bar-of-progress";

import Layout from "../components/Layout";

const progress = new ProgressBar({
  size: 2,
  color: "#fcba03",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  const [darkThemeOn, setDarkThemeOn] = useState(false);

  useEffect(() => {
    setDarkThemeOn(localStorage.getItem("darkThemeOn") === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("darkThemeOn", darkThemeOn.toString());
  }, [darkThemeOn]);

  const theme = createTheme({
    palette: {
      type: darkThemeOn ? "dark" : "light",
    },
  });

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout darkThemeOn={darkThemeOn} setDarkThemeOn={setDarkThemeOn}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MyApp;
