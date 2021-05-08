import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
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
  box: {
    padding: `${theme.spacing(1)}px 0px`,
  },
  animateLoading: {
    animation: "$loading 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  },
  "@keyframes loading": {
    "0%, 100%": {
      opacity: 1,
    },
    "50%": {
      opacity: 0.5,
    },
  },
}));

const LoadingList = () => {
  const classes = useStyles();
  return (
    <div className={classes.animateLoading}>
      <div
        style={{
          width: 200,
          height: 30,
          background: "#424242",
          borderRadius: 100,
          margin: "5px 0",
        }}
      />
      <Grid container>
        {[1, 2, 3, 4, 5, 6].map((index) => {
          return (
            <Grid key={index} item xs={12} sm={4} md={2}>
              <div className={classes.card}>
                <Paper className={classes.image} />
                <Box className={classes.box}>
                  <div
                    style={{
                      height: 20,
                      margin: "4px 0",
                      width: "100%",
                      background: "#424242",
                      borderRadius: 100,
                    }}
                  />
                  <div
                    style={{
                      height: 15,
                      margin: "4px 0",
                      width: "30%",
                      background: "#424242",
                      borderRadius: 100,
                    }}
                  />
                </Box>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default LoadingList;
