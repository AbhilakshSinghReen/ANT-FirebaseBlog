import Link from "next/link";

import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

const summaryTruncateLength = 100;

const useStyles = makeStyles({
  cardMain: {
    height: "auto",
    padding: 5,
    borderRadius: 5,
    border: "1px solid",
    "&:hover": {
      cursor: "pointer",
    },
    marginBottom: 35,
  },
  cardMainActive: {
    borderColor: "#f5b942",
    border: "3px solid",
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
  headingLowMargin: {
    marginTop: 5,
    marginBottom: 5,
  },
});

export default function TutorialSidebarCard({
  tutorial,
  tutorialFullSlug,
  active,
}) {
  console.log(`Tutorial full slug: ${tutorialFullSlug}`);
  const styles = useStyles();

  const [raised, setRaised] = useState(false);

  const toggleRaised = () => {
    setRaised(!raised);
  };

  return (
    <Link href={tutorialFullSlug} passHref>
      <Card
        className={[styles.cardMain, active ? styles.cardMainActive : null]}
        onMouseOver={toggleRaised}
        onMouseOut={toggleRaised}
        raised={raised}
      >
        <div className={styles.cardDetailsDiv}>
          {/*
          <h4 className={styles.headingLowMargin}>
            Part: {tutorial.partInSeries}
            {tutorial.subPartInSeries}
          </h4>
          */}
          <h2 className={styles.headingLowMargin}>{tutorial.title}</h2>
          <p>
            {tutorial.summary.slice(0, summaryTruncateLength)}
            {tutorial.summary.length > summaryTruncateLength ? "..." : ""}
          </p>
        </div>
      </Card>
    </Link>
  );
}
