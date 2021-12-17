import Head from "next/head";

import { Fragment, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import CustomCard from "../../../../components/CustomCard";
import Navigation from "../../../../components/Navigation";

import { baseURL } from "../../../../lib/constants";

const useStyles = makeStyles((theme) => ({
  thumbnailImageContainer: {
    width: "100%",
  },
}));

export async function getStaticProps(context) {
  const categorySlug = context.params.categorySlug;
  const subcategorySlug = context.params.subcategorySlug;

  const { getBlogSubcategoryWithSummaryBySlugs } = await import(
    "../../../../lib/firebase/firestoreServices"
  );

  const result = await getBlogSubcategoryWithSummaryBySlugs(
    categorySlug,
    subcategorySlug
  );

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
  const { getAllBlogSubCategoriesPaths } = await import(
    "../../../../lib/firebase/firestoreServices"
  );

  const result = await getAllBlogSubCategoriesPaths();

  return {
    paths: result,
    fallback: false,
  };
}

export default function BlogSubcategory({ data }) {
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

      <div>
        <Navigation
          pageHierarchyList={[
            {
              link: "/blog",
              title: "Blog",
            },
            {
              link: `/blog/${data.blogCategorySlug}`,
              title: data.blogCategoryTitle,
            },
            {
              link: `/blog/${data.blogCategorySlug}/${data.slug}`,
              title: data.title,
            },
          ]}
        />
        <br />
        <Typography variant="h3" component="h1">
          {data.title}
        </Typography>
        <p>{data.description}</p>
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
          {data.posts.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CustomCard
                title={item.title}
                summary={item.summary}
                thumbnailURL={item.thumbnailImage}
                linkTo={`/blog/${data.blogCategorySlug}/${data.slug}/${item.slug}`}
              />
            </Grid>
          ))}
        </Grid>
        <br />
        <br />
        <br />
      </div>
    </Fragment>
  );
}
