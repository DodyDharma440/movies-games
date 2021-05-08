import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  image: {
    transform: "translateY(-30px)",
    width: 300,
    height: 450,
    marginLeft: "auto",
    background: "#323232",
    "@media (max-width: 768px)": {
      margin: "auto",
    },
  },
  paper: {
    padding: theme.spacing(4),
    margin: `${theme.spacing(4)}px ${theme.spacing(1)}px`,
  },
  title: {
    height: 30,
    marginTop: 5,
    marginBottom: 15,
    background: "#323232",
    borderRadius: 100,
    width: "50%",
  },
  divider: {
    background: "#323232",
    height: 4,
    border: 0,
  },
  titleItem: {
    height: 13,
    marginTop: 2,
    marginBottom: 6,
    background: "#323232",
    borderRadius: 100,
    width: 100,
  },
  captionItem: {
    height: 17,
    margin: "2px 0",
    background: "#323232",
    borderRadius: 100,
    width: "80%",
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

const LoadingDetail = () => {
  const classes = useStyles();
  return (
    <div className={classes.animateLoading}>
      <div
        style={{
          height: 150,
          marginTop: -10,
          background: "#424242",
        }}
      />
      <Container maxWidth="lg">
        <Grid container style={{ justifyContent: "center" }} spacing={3}>
          <Grid item xs={12} md={4}>
            <div className={classes.image} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <div className={classes.title} />
              <hr className={classes.divider} />
              {[1, 2, 3, 4, 5, 6].map((index) => {
                return (
                  <div style={{ paddingTop: 16 }} key={index}>
                    <div className={classes.titleItem} />
                    <div className={classes.captionItem} />
                  </div>
                );
              })}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LoadingDetail;
