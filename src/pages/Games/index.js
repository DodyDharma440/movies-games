import React, { Component } from "react";
import axios from "axios";

import { Container, Grid, Typography } from "@material-ui/core";
import CardMovieGame from "components/movie-game/Card";
import { Alert } from "@material-ui/lab";

import LoadingList from "components/loading/LoadingList";

class Games extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMessage: undefined,
      games: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this._isMounted &&
      this.setState({
        loading: true,
      });
    this.fetchGames();
  }

  componentWillUnmount() {
    this._isMounted = false;
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
    const { loading, errorMessage, games } = this.state;

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
            <Typography variant="h4">Games</Typography>
            <Grid container>
              {games.map((game) => {
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
            </Grid>
          </>
        )}
      </Container>
    );
  }
}

export default Games;
