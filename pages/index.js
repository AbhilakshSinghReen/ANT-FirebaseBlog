import Head from "next/head";

import { Fragment } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import HomePageCard from "../components/HomePageCard";

export async function getStaticProps() {
  const { getHomepageContent } = await import(
    "../lib/firebase/firestoreServices"
  );

  const data = await getHomepageContent();

  return {
    props: { data: data },
    revalidate: 86400,
  };
}

export default function Home({ data }) {
  return (
    <Fragment>
      <Head>
        <title>A.N.T.</title>
      </Head>

      <div>
        <Typography variant="h3" component="h1">
          Welcome
        </Typography>
        <hr />
        <br />
        <br />

        <Grid container spacing={10}>
          {data.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <HomePageCard
                title={item.title}
                summary={item.summary}
                thumbnailURL={item.thumbnailImage}
                linkTo={item.linkTo}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Fragment>
  );
}
