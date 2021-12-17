import Head from "next/head";

import { Fragment, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import CustomCard from "../../../components/CustomCard";
import Navigation from "../../../components/Navigation";

import { baseURL } from "../../../lib/constants";

const useStyles = makeStyles((theme) => ({
  thumbnailImageContainer: {
    width: "100%",
  },
  container: {
    width: "100%",
    paddingBottom: 100,
  },
}));

export async function getStaticProps(context) {
  const categorySlug = context.params.categorySlug;

  const { getBlogCategoryWithSummaryBySlug } = await import(
    "../../../lib/firebase/firestoreServices"
  );

  const result = await getBlogCategoryWithSummaryBySlug(categorySlug);

  if (result === null) {
    return {
      redirect: {
        destination: "/not-found",
        permanent: false,
      },
    };
  }

  return {
    props: { data: result },
    revalidate: 86400,
  };
}

export async function getStaticPaths() {
  const { getAllBlogCategoriesPaths } = await import(
    "../../../lib/firebase/firestoreServices"
  );

  const result = await getAllBlogCategoriesPaths();

  return {
    paths: result,
    fallback: false,
  };
}

export default function BlogCategory({ data }) {
  const styles = useStyles();

  if (!data) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{data?.title}</title>
        <meta name="description" content={data?.metaDescription} />

        <meta name="og:title" content={data?.title} />
        <meta name="og:type" content="article" />
        <meta name="og:url" content={`${baseURL}/blog/${data?.slug}`} />
        <meta name="og:image" content={data?.thumbnailImage} />
        <meta name="og:description" content={data?.description.slice(0, 164)} />
        <meta name="og:site_name" content="A Nice Teacher" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={data?.title} />
        <meta
          name="twitter:description"
          content={data?.description.slice(0, 199)}
        />
        <meta name="twitter:image:src" content={data?.thumbnailImage} />
      </Head>

      <div className={styles.container}>
        <Navigation
          pageHierarchyList={[
            {
              link: "/blog",
              title: "Blog",
            },
            {
              link: `/blog/${data.slug}`,
              title: data.title,
            },
          ]}
        />
        <br />
        <Typography variant="h3" component="h1">
          {data.title}
        </Typography>
        <p>{data.summary}</p>
        <hr />
        <div
          className={styles.thumbnailImageContainer}
          dangerouslySetInnerHTML={{
            __html: `<img src="${data.thumbnailImage}" alt="${data.title} thumbnail image." style="max-width: 100%; max-height: 50vh;" />`,
          }}
        ></div>
        <br />
        <br />
        <Grid container spacing={8}>
          {data.subcategories.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CustomCard
                title={item.title}
                summary={item.description}
                thumbnailURL={item.thumbnailImage}
                linkTo={`/blog/${data.slug}/${item.slug}`}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Fragment>
  );
}
