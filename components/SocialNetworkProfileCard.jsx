import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  cardMain: {
    height: "100%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 25,
    borderRadius: 15,
    border: "1px solid",
    "&:hover": {
      cursor: "pointer",
    },
  },
});

export default function SocialNetworkProfileCard({ profile }) {
  const styles = useStyles();

  const [raised, setRaised] = useState(false);

  const [copyButtonLabel, setCopyButtonLabel] = useState("Copy");

  const toggleRaised = () => {
    setRaised(!raised);
  };

  const resetCopyButtonLabelAfter5Seconds = () => {
    setTimeout(() => {
      setCopyButtonLabel("Copy");
    }, 5000);
  };

  const copyButtonOnClick = () => {
    navigator.clipboard
      .writeText(profile.profileURL)
      .then(() => {
        setCopyButtonLabel("Copied");
        resetCopyButtonLabelAfter5Seconds();
      })
      .catch(() => {
        setCopyButtonLabel("Error");
        resetCopyButtonLabelAfter5Seconds();
      });
  };

  return (
    <Card
      className={styles.cardMain}
      style={{
        backgroundImage: `linear-gradient(to bottom right, #fff , transparent );`,
      }}
      onMouseOver={toggleRaised}
      onMouseOut={toggleRaised}
      raised={raised}
    >
      <h1>{profile.networkName}</h1>
      <h1>{profile.profileName}</h1>
      <Button
        fullWidth
        onClick={() => {
          window.open(profile.profileURL);
        }}
      >
        Open
      </Button>
      <Button fullWidth onClick={() => copyButtonOnClick()}>
        {copyButtonLabel}
      </Button>
    </Card>
  );
}
