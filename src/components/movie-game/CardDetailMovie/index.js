import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    margin: `${theme.spacing(4)}px ${theme.spacing(1)}px`,
    background: theme.palette.primary.dark,
  },
  divider: {
    background: theme.palette.secondary.main,
    height: 4,
    border: 0,
  },
  dataGroup: {
    paddingTop: `${theme.spacing(2)}px`,
  },
  title: {
    color: "#aaa",
    marginBottom: 4,
  },
}));

const CardDetailMovie = ({ movie }) => {
  const classes = useStyles();
  const { title, year, duration, genre, rating, description, review } = movie;

  const dataMovie = [
    { label: "Release Year", value: year },
    { label: "Duration", value: `${duration} minutes` },
    { label: "Genre", value: genre },
    { label: "Rating", value: rating },
    { label: "Description", value: description },
    { label: "Review", value: review },
  ];

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" style={{ marginBottom: 10 }}>
        {title}
      </Typography>
      <hr className={classes.divider} />
      {dataMovie.map((data, index) => {
        return (
          <div className={classes.dataGroup} key={index}>
            <Typography variant="body2" className={classes.title}>
              {data.label} :
            </Typography>
            <Typography>{data.value}</Typography>
          </div>
        );
      })}
    </Paper>
  );
};

export default CardDetailMovie;
