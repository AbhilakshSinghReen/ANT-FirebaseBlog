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
  cardHalfDiv: {
    height: "50%",
  },
  thumbnailImage: {
    maxWidth: "100%",
  },
});

export default function HomePageCard({ title, summary, linkTo }) {
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
        <h1>{title}</h1>
        <p>
          {summary.slice(0, summaryTruncateLength)}
          {summary.length > summaryTruncateLength ? "..." : ""}
        </p>
      </Card>
    </Link>
  );
}
