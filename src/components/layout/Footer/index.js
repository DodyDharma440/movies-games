import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Container, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    padding: `${theme.spacing(3)}px`,
    marginTop: "auto",
    boxShadow: "0px -2px 3px #171717",
    marginBottom: 0,
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Container maxWidth="lg" style={{ textAlign: "center" }}>
        <Typography variant="caption" style={{ color: "#fff" }}>
          Copyright &copy; 2021 by sanbercode
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
