import Link from "next/link";

import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

const summaryTruncateLength = 100;

const useStyles = makeStyles({
  cardMain: {
    height: "100%",
    padding: 25,
    borderRadius: 15,
    border: "1px solid",
    "&:hover": {
      cursor: "pointer",
    },
  },
  cardImageDiv: {
    height: "67%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cardDetailsDiv: {
    height: "33%",
  },
  cardHalfDiv: {
    height: "50%",
  },
  thumbnailImage: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

export default function CustomCard({ title, summary, thumbnailURL, linkTo }) {
  const styles = useStyles();

  const [raised, setRaised] = useState(false);

  const toggleRaised = () => {
    setRaised(!raised);
  };

  return (
    <Link href={linkTo} passHref>
      <Card
        className={styles.cardMain}
        onMouseOver={toggleRaised}
        onMouseOut={toggleRaised}
        raised={raised}
      >
        <div
          className={styles.cardImageDiv}
          dangerouslySetInnerHTML={{
            __html: `<img src="${thumbnailURL}" alt="${title} thumbnail image." style="max-width: 100%; max-height: 100%;" />`,
          }}
        ></div>
        <div className={styles.cardDetailsDiv}>
          <h1>{title}</h1>
          <p>
            {summary.slice(0, summaryTruncateLength)}
            {summary.length > summaryTruncateLength ? "..." : ""}
          </p>
        </div>
      </Card>
    </Link>
  );
}
