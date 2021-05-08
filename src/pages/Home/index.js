import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { Container, Grid, Typography, Button } from "@material-ui/core";
import { ArrowForwardIosRounded } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import CardMovieGame from "components/movie-game/Card";
import LoadingList from "components/loading/LoadingList";

class Home extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMessage: undefined,
      games: [],
      movies: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted &&
      this.setState({
        loading: true,
      });
    this.fetchMovies();
    this.fetchGames();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchMovies() {
    axios
      .get("https://backendexample.sanbersy.com/api/data-movie")
      .then((res) => {
        this._isMounted &&
          this.setState({
            movies: res.data,
            loading: false,
          });
      })
      .catch((err) => {
        this._isMounted &&
          this.setState({
            errorMessage: err.message,
            loading: false,
          });
      });
  }

  fetchGames() {
    axios
      .get("https://backendexample.sanbersy.com/api/data-game")
      .then((res) => {
        this._isMounted &&
          this.setState({
            games: res.data,
            loading: false,
          });
      })
      .catch((err) => {
        this._isMounted &&
          this.setState({
            errorMessage: err.message,
            loading: false,
          });
      });
  }

  render() {
    const { loading, errorMessage, games, movies } = this.state;

    return (
      <Container maxWidth="lg">
        {loading ? (
          <LoadingList />
        ) : errorMessage ? (
          <Alert severity="error" style={{ marginBottom: 16 }}>
            {`Movies fetch failed. ${errorMessage}`}
          </Alert>
        ) : (
          <>
            <Typography variant="h4">Movies</Typography>
            <Grid container>
              {movies.slice(0, 5).map((movie) => {
                const { id, title, year, image_url, genre } = movie;

                return (
                  <Grid key={id} item xs={12} sm={4} md={2}>
                    <CardMovieGame
                      type="movies"
                      id={id}
                      title={title}
                      year={year}
                      imageUrl={image_url}
                      genre={genre}
                    />
                  </Grid>
                );
              })}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 30,
                }}
              >
                <Link to="/movies">
                  <Button
                    style={{ width: 85, height: 85, borderRadius: "50%" }}
                    variant="contained"
                    color="secondary"
                  >
                    <ArrowForwardIosRounded style={{ fontSize: 30 }} />
                  </Button>
                </Link>
              </div>
            </Grid>
          </>
        )}

        {loading ? (
          <LoadingList />
        ) : errorMessage ? (
          <Alert severity="error">{`Games fetch failed. ${errorMessage}`}</Alert>
        ) : (
          <>
            <Typography variant="h4">Games</Typography>
            <Grid container>
              {games.slice(0, 5).map((game) => {
                const { id, name, release, image_url, genre } = game;
                return (
                  <Grid key={id} item xs={12} sm={4} md={2}>
                    <CardMovieGame
                      type="games"
                      id={id}
                      title={name}
                      year={release}
                      imageUrl={image_url}
                      genre={genre}
                    />
                  </Grid>
                );
              })}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 30,
                }}
              >
                <Link to="/games">
                  <Button
                    style={{ width: 85, height: 85, borderRadius: "50%" }}
                    variant="contained"
                    color="secondary"
                  >
                    <ArrowForwardIosRounded style={{ fontSize: 30 }} />
                  </Button>
                </Link>
              </div>
            </Grid>
          </>
        )}
      </Container>
    );
  }
}

export default Home;
