import Link from "next/link";

import { useState } from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/core/Menu";
import MuiMenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Brightness3Icon from "@material-ui/icons/Brightness3";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const MenuItem = withStyles({
  root: {
    justifyContent: "center",
  },
})(MuiMenuItem);

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
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: theme.palette.action.hover,
    },
  },
  mobileNavMenu: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Navbar({ darkThemeOn, setDarkThemeOn }) {
  const styles = useStyles();

  const [smallScreenNavMenuOpen, setSmallScreenNavMenuOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const toggleMenu = () => {
    setSmallScreenNavMenuOpen(!smallScreenNavMenuOpen);
  };

  return (
    <AppBar position="fixed" color="default" elevation={0}>
      <Toolbar>
        <Container className={styles.navbarContainer}>
          <Link href="/" passHref>
            <h2 className={styles.navbarBrand}>A.N.T.</h2>
          </Link>
          <Hidden mdDown>
            <Link href="/tutorials">Tutorials</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/connect">Connect</Link>
            <Link href="/about">About</Link>
          </Hidden>

          <Hidden lgUp>
            <IconButton
              aria-controls="nav-menu-for-mobile"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              className={styles.mobileNavMenu}
              id="nav-menu-for-mobile"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>
                <Link href="/tutorials">Tutorials</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/blog">Blog</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/connect">Connect</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/about">About</Link>
              </MenuItem>
            </Menu>
          </Hidden>

          <IconButton onClick={() => setDarkThemeOn(!darkThemeOn)}>
            <ArrowRightAltIcon />
            {darkThemeOn ? <WbSunnyIcon /> : <Brightness3Icon />}
          </IconButton>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
