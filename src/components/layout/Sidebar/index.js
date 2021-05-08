import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "context/userContext";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
} from "@material-ui/core";
import {
  ArrowBackIosRounded,
  TheatersRounded,
  SportsEsportsRounded,
  VerifiedUserRounded,
} from "@material-ui/icons";
import { deepPurple } from "@material-ui/core/colors";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    border: "0px",
    "& div": {
      background: theme.palette.primary.dark,
    },
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  menuItemActive: {
    "& div.MuiListItem-button": {
      background: `${theme.palette.primary.main} !important`,
      borderRight: `5px solid ${theme.palette.secondary.main}`,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: 64,
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
  },
  avatar: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: `${theme.palette.secondary.main} !important`,
    width: 50,
    height: 50,
    margin: `${theme.spacing(1)}px auto`,
  },
}));

const menuItems = [
  {
    path: "/admin/movies",
    label: "Data Movies",
    exact: true,
    icon: <TheatersRounded style={{ fontSize: 25 }} />,
  },
  {
    path: "/admin/games",
    label: "Data Games",
    icon: <SportsEsportsRounded style={{ fontSize: 25 }} />,
  },
  {
    path: "/admin/change-password",
    label: "Change Password",
    icon: <VerifiedUserRounded style={{ fontSize: 25 }} />,
  },
];

const Sidebar = ({ handleDrawerAction, drawerOpen }) => {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: drawerOpen,
        [classes.drawerClose]: !drawerOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        }),
      }}
    >
      <div className={classes.toolbar}>
        {drawerOpen && (
          <IconButton onClick={handleDrawerAction} style={{ marginRight: 8 }}>
            <ArrowBackIosRounded />
          </IconButton>
        )}
      </div>
      <Divider />

      <List>
        <div className={classes.userInfo}>
          <div>
            <Avatar className={classes.avatar}>
              <Typography variant="h5" style={{ textTransform: "uppercase" }}>
                {userData.name.slice(0, 1)}
              </Typography>
            </Avatar>
            {drawerOpen ? (
              <Typography style={{ textAlign: "center" }} variant="h6">
                {`Hai, ${userData.name}`}
              </Typography>
            ) : null}
          </div>
        </div>
        {menuItems.map((menuItem, index) => {
          return (
            <NavLink
              exact={menuItem.exact}
              key={index}
              to={menuItem.path}
              style={{ textDecoration: "none" }}
              activeClassName={classes.menuItemActive}
            >
              <ListItem button style={{ paddingLeft: 22 }}>
                <ListItemIcon style={{ background: "transparent" }}>
                  {menuItem.icon}
                </ListItemIcon>
                <ListItemText style={{ background: "transparent" }}>
                  {menuItem.label}
                </ListItemText>
              </ListItem>
            </NavLink>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
