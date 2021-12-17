import Head from "next/head";

import { Fragment } from "react";

import Typography from "@material-ui/core/Typography";

import ReactHtmlParser from "react-html-parser";

export async function getStaticProps() {
  const { getPrivacyPolicyPageContent } = await import(
    "../lib/firebase/firestoreServices"
  );
  const result = await getPrivacyPolicyPageContent();

  return {
    props: { data: result },
    revalidate: 31536000,
  };
}

export default function PrivacyPolicy({ data }) {
  return (
    <Fragment>
      <Head>
        <title>Privacy Policy - A.N.T.</title>
      </Head>
      <Typography variant="h3" component="h1">
        Privacy Policy
      </Typography>
      <hr />
      <p>Updated: {data.dateUpdated}</p>
      <div>{ReactHtmlParser(data.content)}</div>
    </Fragment>
  );
}
