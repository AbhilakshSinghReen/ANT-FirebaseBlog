import Head from "next/head";

import React, { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import SocialNetworkProfileCard from "../components/SocialNetworkProfileCard";

const useStyles = makeStyles({
  profileContainer: {
    height: "100%",
    width: "100%",
    borderRadius: 25,
    padding: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",

    "&:hover": {
      cursor: "pointer",
    },
  },
});

export async function getStaticProps() {
  const { getConnectPageContent } = await import(
    "../lib/firebase/firestoreServices"
  );

  const data = await getConnectPageContent();

  return {
    props: { data: data },
    revalidate: 86400,
  };
}

export default function Connect({ data }) {
  const styles = useStyles();

  return (
    <Fragment>
      <Head>
        <title>Connect - A.N.T.</title>
      </Head>

      <div>
        <Typography variant="h3" component="h1">
          Connect
        </Typography>
        <hr />
        <br />
        <br />
        <Grid container spacing={10}>
          {data.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <SocialNetworkProfileCard profile={item} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Fragment>
  );
}
