import { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import Navbar from "./Navbar";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    padding: " 0 0.5rem",
    display: " flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  toolbarSpaceDiv: theme.mixins.toolbar,
  updateAlertText: {
    marginTop: 0,
    marginBottom: 0,
  },
}));

export default function Layout({ children, darkThemeOn, setDarkThemeOn }) {
  const styles = useStyles();

  return (
    <Fragment>
      <Navbar darkThemeOn={darkThemeOn} setDarkThemeOn={setDarkThemeOn} />
      <div className={styles.toolbarSpaceDiv}></div>

      <Paper className={styles.container}>
        <br />
        <Container>
          {/*
          <h3 className={styles.updateAlertText}>
            UPDATE ALERTS GO HERE
          </h3>
          */}
          {/*<main></main>*/}
          {children}
        </Container>
      </Paper>

      <Footer />
    </Fragment>
  );
}
