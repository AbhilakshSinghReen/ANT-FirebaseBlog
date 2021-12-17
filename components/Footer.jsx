import Link from "next/link";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: 25,
  },
  navbarContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navbarBrand: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#ffffff",
    },
  },
}));

export default function Navbar({ darkThemeOn, setDarkThemeOn }) {
  const styles = useStyles();
  return (
    <footer>
      <Box>
        <Container>
          <br />
          <br />
          <Grid container spacing={5}>
            <Grid item xs={6} sm={4}>
              <Link href="/tutorials">Tutorials</Link>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Link href="/blog">Blog</Link>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Link href="/connect">Connect</Link>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Link href="/about">About</Link>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Link href="/terms-and-conditions">Terms and Conditions</Link>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Link href="/sitemap.xml">Sitemap</Link>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  );
}
