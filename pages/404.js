import Head from "next/head";

import { Fragment } from "react";

export default function NotFound() {
  return (
    <Fragment>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <div>
        <h1>Oops</h1>
        <hr />
        <h2>It looks like the page you are looking for does not exist.</h2>
        <h3>Here{`'`}s an image of a pupper.</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: `<img src="https://source.unsplash.com/400x400/?puppy" alt="An image of a puppy." style="width: 400px; height: 400px;" />`,
          }}
        ></div>
      </div>
    </Fragment>
  );
}
