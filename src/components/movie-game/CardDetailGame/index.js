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

const CardDetailGame = ({ game }) => {
  const classes = useStyles();
  const { name, release, genre, platform, singlePlayer, multiplayer } = game;

  const dataGame = [
    { label: "Release Year", value: release },
    { label: "Genre", value: genre },
    { label: "Platform", value: platform },
    { label: "Single Player", value: singlePlayer === 1 ? "Yes" : "No" },
    { label: "Multi Player", value: multiplayer === 1 ? "Yes" : "No" },
  ];

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4" style={{ marginBottom: 10 }}>
        {name}
      </Typography>
      <hr className={classes.divider} />
      {dataGame.map((data, index) => {
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

export default CardDetailGame;
