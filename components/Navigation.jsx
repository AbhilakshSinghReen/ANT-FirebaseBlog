import Link from "next/link";
import { useRouter } from "next/router";

import { Fragment } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

export default function Navigation({ pageHierarchyList }) {
  const styles = useStyles();
  const router = useRouter();

  const backButtonOnClick = () => {
    router.push(pageHierarchyList[pageHierarchyList.length - 2].link);
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.navigationDiv}>
        {pageHierarchyList.map((page) => (
          <Fragment key={pageHierarchyList.indexOf(page)}>
            <ArrowForwardIosIcon />
            <Link href={page.link} passHref>
              <p className={styles.linkText}>{page.title}</p>
            </Link>
          </Fragment>
        ))}
      </div>
      <Button className={styles.backButton} onClick={() => backButtonOnClick()}>
        Back
      </Button>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    backgroundColor: theme.palette.type == "light" ? "#eeeeee" : "#111111",
    borderRadius: 50,
    paddingLeft: 25,
    paddingRight: 25,

    /*
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    */
  },
  navigationDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backButton: {
    borderRadius: 25,
  },
  linkText: {
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
}));
