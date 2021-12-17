import Head from "next/head";

import { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import CustomCard from "../../components/CustomCard";

export async function getStaticProps(context) {
  const { getAllBlogCategoriesSummary } = await import(
    "../../lib/firebase/firestoreServices"
  );

  const result = await getAllBlogCategoriesSummary();

  return {
    props: { blogCategories: result },
    revalidate: 86400,
  };
}

export default function BlogHomePage({ blogCategories }) {
  const styles = useStyles();

  return (
    <Fragment>
      <Head>
        <title>A.N.T. Blog</title>
        <meta name="description" content="A Nice Teacher Blog" />
      </Head>

      <div className={styles.container}>
        <Typography variant="h3" component="h1">
          A.N.T. Blog
        </Typography>
        <hr />
        <br />
        <br />
        <Grid container spacing={3}>
          {blogCategories.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CustomCard
                title={item.title}
                summary={item.description}
                thumbnailURL={item.thumbnailImage}
                linkTo={`/blog/${item.slug}`}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    paddingBottom: 100,
  },
}));
