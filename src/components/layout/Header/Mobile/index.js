import React, { useState, useContext } from "react";
import { UserContext } from "context/userContext";
import { Link } from "react-router-dom";
import { Typography, IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

const MenuMobile = ({ handleLogoutClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { userData } = useContext(UserContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        style={{ width: 200 }}
      >
        <MenuItem>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography>Home</Typography>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/movies" style={{ textDecoration: "none" }}>
            <Typography>Movies</Typography>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/games" style={{ textDecoration: "none" }}>
            <Typography>Games</Typography>
          </Link>
        </MenuItem>
        {userData.isLoggedIn ? (
          <MenuItem onClick={handleLogoutClick}>
            <Typography>Logout</Typography>
          </MenuItem>
        ) : (
          <MenuItem>
            <Link to="/auth" style={{ textDecoration: "none" }}>
              <Typography>Login</Typography>
            </Link>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default MenuMobile;
