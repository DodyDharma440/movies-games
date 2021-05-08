import React, { Component } from "react";
import axios from "axios";

import { Container, Grid, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import CardMovieGame from "components/movie-game/Card";
import LoadingList from "components/loading/LoadingList";

class Movies extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMessage: undefined,
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

  render() {
    const { loading, errorMessage, movies } = this.state;

    return (
      <Container maxWidth="lg">
        {loading ? (
          <LoadingList />
        ) : errorMessage ? (
          <Alert severity="error" style={{ marginBottom: 16 }}>
            {`Games fetch failed. ${errorMessage}`}
          </Alert>
        ) : (
          <>
            <Typography variant="h4">Movies</Typography>
            <Grid container>
              {movies.map((movie) => {
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
            </Grid>
          </>
        )}
      </Container>
    );
  }
}

export default Movies;
