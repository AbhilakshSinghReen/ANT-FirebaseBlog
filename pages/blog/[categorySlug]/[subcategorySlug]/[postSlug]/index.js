import Head from "next/head";

import { Fragment, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import ReactHtmlParser from "react-html-parser";

import Navigation from "../../../../../components/Navigation";
import ContentsRenderer from "../../../../../components/ContentsRenderer";
import CodeSnippetRenderer from "../../../../../components/CodeSnippetRenderer";
import ConnectRenderer from "../../../../../components/ConnectRenderer";

import { baseURL } from "../../../../../lib/constants";

const useStyles = makeStyles((theme) => ({
  mainContent: {
    boxShadow: theme.shadows[10],
    backgroundColor: theme.palette.type === "light" ? "#ffffff" : "#000000",
    paddingLeft: 15,
    paddingTop: 15,
  },
  thumbnailImageContainer: {
    width: "100%",
  },
}));

export async function getStaticProps(context) {
  const categorySlug = context.params.categorySlug;
  const subcategorySlug = context.params.subcategorySlug;
  const postSlug = context.params.postSlug;

  const { getBlogPostBySlugs } = await import(
    "../../../../../lib/firebase/firestoreServices"
  );

  const result = await getBlogPostBySlugs(
    categorySlug,
    subcategorySlug,
    postSlug
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
  const { getAllBlogPostsPaths } = await import(
    "../../../../../lib/firebase/firestoreServices"
  );

  const result = await getAllBlogPostsPaths();

  return {
    paths: result,
    fallback: false,
  };
}

export default function BlogPost({ data }) {
  const styles = useStyles();

  const transformFunction = (node) => {
    if (node?.parent?.type === "tag" && node?.parent?.name === "pre") {
      let codeString = ``;
      const language = node.parent.attribs.class.replace("language-", "");

      node.children.forEach((childTag) => {
        if (childTag.parent.name === "code") {
          codeString += `${childTag.data}`;
        }
      });

      return (
        <CodeSnippetRenderer language={language} codeString={codeString} />
      );
    }
  };

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
        <title>{data.title}</title>
        <meta name="description" content={data.metaDescription} />

        <meta name="og:title" content={data.title} />
        <meta name="og:type" content="article" />
        <meta
          name="og:url"
          content={`${baseURL}/blog/${data.blogCategorySlug}/${data.blogSubcategorySlug}/${data.slug}`}
        />
        <meta name="og:image" content={data.thumbnailImage} />
        <meta name="og:description" content={data.summary.slice(0, 164)} />
        <meta name="og:site_name" content="A Nice Teacher" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.summary.slice(0, 199)} />
        <meta name="twitter:image:src" content={data.thumbnailImage} />

        {/*
          <meta itemProp="name" content={post.title} />
          <meta itemProp="description" content={post.title} />
        */}
      </Head>
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
            link: `/blog/${data.blogCategorySlug}/${data.blogSubcategorySlug}`,
            title: data.blogSubcategoryTitle,
          },
          {
            link: `/blog/${data.blogCategorySlug}/${data.blogSubcategorySlug}/${data.slug}`,
            title: data.title,
          },
        ]}
      />
      <br />
      <br />
      <Grid style={{ padding: "25px" }} container spacing={8}>
        {/*
        <Grid
          item
          xs={12}
          sm={2}
          style={{ maxHeight: "100vh", overflow: "auto" }}
        >
          <h1>This is an Ad</h1>
          <h1>This is an Ad</h1>
          <h1>This is an Ad</h1>
          <h1>This is an Ad</h1>
          <h1>This is an Ad</h1>
        </Grid>
        */}
        <Grid
          item
          className={styles.mainContent}
          xs={12}
          //sm={8}
        >
          <article>
            <Typography variant="h3" component="h1">
              {data.title}
            </Typography>
            <p>{data.dateUpdated}</p>
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
            <ContentsRenderer contents={data.index} />
            <ConnectRenderer />
            <div>
              {ReactHtmlParser(data.content, { transform: transformFunction })}
            </div>
          </article>
        </Grid>
        {/*
        <Grid item xs={12} sm={4}>
          <h1>This is an Ad</h1>
          <h1>This is an Ad</h1>
          <h1>This is an Ad</h1>
          <h1>This is an Ad</h1>
          <h1>This is an Ad</h1>
        </Grid>
        */}
      </Grid>
      <br />
      <br />
      <br />
    </Fragment>
  );
}
