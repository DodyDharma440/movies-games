import React, { useContext, useState, useEffect } from "react";
import clsx from "clsx";
import { UserContext } from "context/userContext";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@material-ui/core";
import { MenuRounded } from "@material-ui/icons";
import MenuMobile from "components/layout/Header/Mobile";
import MenuDesktop from "components/layout/Header/Desktop";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  appBar: {
    paddingLeft: theme.spacing(7),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    paddingLeft: 0,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
    fontWeight: "bold",
  },
  buttonContent: {
    textTransform: "capitalize",
  },
  box: {
    display: "flex",
    alignItems: "center",
    margin: `0 ${theme.spacing(2)}`,
  },
  linkMenu: {
    textDecoration: "none",
    color: "#aaaaaa",
    marginRight: theme.spacing(3),
    "& p": {
      fontWeight: "bold",
      fontSize: "0.8em",
      transition: "all 0.3s",
      padding: "1px 0",
    },
  },
  linkMenuTextActive: {
    color: "#ffffff",
    fontSize: "1em",
    fontWeight: "bold",
    marginRight: theme.spacing(3),
    borderBottom: `4px solid ${theme.palette.secondary.main}`,
    "& p": {
      fontSize: "1em",
    },
  },
}));

const Header = ({ handleDrawerAction, drawerOpen }) => {
  const classes = useStyles();
  const { userData, setUserData } = useContext(UserContext);
  const [width, setWidth] = useState(undefined);

  const handleLogoutClick = () => {
    const newUserData = {
      name: "",
      email: "",
      token: "",
      isLoggedIn: false,
    };
    setUserData(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
    handleDrawerAction();
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", () => handleResize());

    handleResize();

    window.removeEventListener("resize", () => handleResize());
  }, []);

  return (
    <AppBar
      position="fixed"
      color="primary"
      className={clsx(classes.appBar, { [classes.appBarShift]: drawerOpen })}
      style={{
        paddingLeft: !userData.isLoggedIn && 0,
      }}
    >
      <Toolbar>
        {!drawerOpen &&
          (userData.isLoggedIn ? (
            <IconButton onClick={handleDrawerAction} style={{ marginRight: 8 }}>
              <MenuRounded />
            </IconButton>
          ) : null)}

        <Typography className={classes.title} variant="h5">
          {"Movies & Games"}
        </Typography>

        {width < 900 ? (
          <MenuMobile handleLogoutClick={handleLogoutClick} />
        ) : (
          <MenuDesktop handleLogoutClick={handleLogoutClick} />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
