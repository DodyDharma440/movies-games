import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Box } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "15px auto 5px auto",
    width: 170,
    "@media (max-width: 576px)": {
      width: 200,
    },
  },
  image: {
    height: 280,
    width: "100%",
    borderRadius: 15,
  },
  genre: {
    position: "relative",
    top: 240,
    background: "#00000096",
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    textAlign: "center",
    textTransform: "capitalize",
    transition: "all 0.3s",
    "& p": {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  box: {
    padding: `${theme.spacing(1)}px 0px`,
  },
  title: {
    cursor: "pointer",
    fontSize: 16,
    fontWeight: 500,
    transition: "all 0.2s",
    "&:hover": {
      color: theme.palette.secondary.light,
    },
  },
  year: {
    color: "#a1a1a1",
  },
}));

const CardMovieGame = ({ type, id, title, year, imageUrl, genre }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper
        className={classes.image}
        style={{
          background: `url('${imageUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={classes.genre}>
          <Typography>{genre !== null ? genre : "Unknown"}</Typography>
        </div>
      </Paper>
      <Box className={classes.box}>
        <Link style={{ textDecoration: "none" }} to={`${type}/detail/${id}`}>
          <Typography className={classes.title}>{title}</Typography>
        </Link>
        <Typography variant="body2" className={classes.year}>
          {year}
        </Typography>
      </Box>
    </div>
  );
};

export default CardMovieGame;
