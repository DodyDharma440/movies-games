import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useParams } from "react-router-dom";
import HeaderDetail from "components/movie-game/HeaderDetail";
import CardDetailMovie from "components/movie-game/CardDetailMovie";
import CardDetailGame from "components/movie-game/CardDetailGame";
import LoadingDetail from "components/loading/LoadingDetail";

const useStyles = makeStyles((theme) => ({
  "@media (max-width: 768px)": {
    gridImage: {
      textAlign: "center !important",
    },
  },
  gridContainer: {
    justifyContent: "center",
  },
  gridImage: {
    textAlign: "right",
  },
  image: {
    transform: "translateY(-30px)",
    width: 300,
    height: 450,
    marginLeft: "auto",
    "@media (max-width: 768px)": {
      margin: "auto",
    },
  },
}));

const Detail = ({ type }) => {
  const { id } = useParams();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [dataDetail, setDataDetail] = useState({});

  useEffect(() => {
    let url = `https://backendexample.sanbersy.com/api/data-${type}/${id}`;
    setLoading(true);
    setErrorMessage(undefined);
    axios
      .get(url)
      .then((res) => {
        setDataDetail(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setLoading(false);
      });
  }, [id, type]);

  return loading ? (
    <LoadingDetail />
  ) : errorMessage ? (
    <Container maxWidth="lg">
      <Alert severity="error">{errorMessage}</Alert>
    </Container>
  ) : (
    <>
      <HeaderDetail image={dataDetail.image_url} />
      <Container maxWidth="lg">
        <Grid container className={classes.gridContainer} spacing={3}>
          <Grid item xs={12} md={4} className={classes.gridImage}>
            <div
              className={classes.image}
              style={{
                background: `url('${dataDetail.image_url}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            {type === "movie" ? (
              <CardDetailMovie movie={dataDetail} />
            ) : type === "game" ? (
              <CardDetailGame game={dataDetail} />
            ) : null}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Detail;
