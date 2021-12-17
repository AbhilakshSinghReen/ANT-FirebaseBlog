import Head from "next/head";

import { Fragment } from "react";

import Typography from "@material-ui/core/Typography";

import ReactHtmlParser from "react-html-parser";

export async function getStaticProps() {
  const { getTermsAndConditionsPageContent } = await import(
    "../lib/firebase/firestoreServices"
  );
  const result = await getTermsAndConditionsPageContent();

  return {
    props: { data: result },
    revalidate: 31536000,
  };
}

export default function TermsAndConditions({ data }) {
  return (
    <Fragment>
      <Head>
        <title>Terms and Conditions - A.N.T.</title>
      </Head>
      <Typography variant="h3" component="h1">
        Terms and Conditions
      </Typography>
      <hr />
      <p>Updated: {data.dateUpdated}</p>
      <div>{ReactHtmlParser(data.content)}</div>
    </Fragment>
  );
}
