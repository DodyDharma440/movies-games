import React, { useContext } from "react";
import { Typography, Button, Box } from "@material-ui/core";
import { UserContext } from "context/userContext";
import { makeStyles } from "@material-ui/core/styles";
import { AccountCircleRounded, ExitToAppRounded } from "@material-ui/icons";
import { NavLink, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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

const MenuDesktop = ({ handleLogoutClick }) => {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  return (
    <>
      <Box className={classes.box}>
        <NavLink
          exact
          activeClassName={classes.linkMenuTextActive}
          className={classes.linkMenu}
          to="/"
        >
          <Typography>Home</Typography>
        </NavLink>

        <NavLink
          activeClassName={classes.linkMenuTextActive}
          className={classes.linkMenu}
          to="/movies"
        >
          <Typography>Movies</Typography>
        </NavLink>

        <NavLink
          activeClassName={classes.linkMenuTextActive}
          className={classes.linkMenu}
          to="/games"
        >
          <Typography>Games</Typography>
        </NavLink>
      </Box>
      {userData.isLoggedIn ? (
        <Button
          onClick={handleLogoutClick}
          variant="contained"
          color="secondary"
          style={{ borderRadius: 15 }}
          startIcon={<ExitToAppRounded />}
        >
          <Typography variant="body2" className={classes.buttonContent}>
            Logout
          </Typography>
        </Button>
      ) : (
        <Link to="/auth" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="secondary"
            style={{ borderRadius: 15 }}
            startIcon={<AccountCircleRounded />}
          >
            <Typography variant="body2" className={classes.buttonContent}>
              Login
            </Typography>
          </Button>
        </Link>
      )}
    </>
  );
};

export default MenuDesktop;
