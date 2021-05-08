import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useParams, Redirect } from "react-router-dom";
import { UserContext } from "context/userContext";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Paper,
  Grid,
  Typography,
  Button,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(4),
    background: theme.palette.primary.dark,
    marginBottom: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

const FormGames = () => {
  const classes = useStyles();
  let { id } = useParams();
  const { userData } = useContext(UserContext);
  const [inputValue, setInputValue] = useState({
    name: "",
    genre: "",
    singlePlayer: 0,
    multiplayer: 0,
    platform: "",
    release: "2000",
    image_url: "",
  });
  const [redirect, setRedirect] = useState(false);

  const handleOnInputChange = (e) => {
    const { name, value, checked } = e.target;

    switch (name) {
      case "name":
        setInputValue({ ...inputValue, name: value });
        break;
      case "genre":
        setInputValue({ ...inputValue, genre: value });
        break;
      case "singlePlayer":
        setInputValue({ ...inputValue, singlePlayer: checked ? 1 : 0 });
        break;
      case "multiPlayer":
        setInputValue({ ...inputValue, multiplayer: checked ? 1 : 0 });
        break;
      case "platform":
        setInputValue({ ...inputValue, platform: value });
        break;
      case "release":
        setInputValue({ ...inputValue, release: value });
        break;
      case "image_url":
        setInputValue({ ...inputValue, image_url: value });
        break;
      default:
        setInputValue({ ...inputValue });
        break;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let url = "https://backendexample.sanbersy.com/api/data-game";
    axios
      .post(url, inputValue, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        setInputValue({
          name: "",
          genre: "",
          singlePlayer: 0,
          multiplayer: 0,
          platform: "",
          release: 2000,
          image_url: "",
        });
        setRedirect(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleFormEditSubmit = (e) => {
    e.preventDefault();
    let url = `https://backendexample.sanbersy.com/api/data-game/${id}`;
    axios
      .put(url, inputValue, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        setInputValue({
          name: "",
          genre: "",
          singlePlayer: 0,
          multiplayer: 0,
          platform: "",
          release: 2000,
          image_url: "",
        });
        setRedirect(true);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    if (id !== undefined) {
      axios
        .get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
        .then((res) => {
          setInputValue(res.data);
        });
    }
  }, [id]);

  const {
    name,
    genre,
    singlePlayer,
    multiplayer,
    platform,
    release,
    image_url,
  } = inputValue;

  return (
    <Container className={classes.root}>
      <Typography variant="h5" style={{ marginBottom: 10 }}>
        Form Game
      </Typography>
      <form
        onSubmit={(e) => (!id ? handleFormSubmit(e) : handleFormEditSubmit(e))}
      >
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <TextField
                label={<Typography>Name</Typography>}
                color="secondary"
                fullWidth
                variant="filled"
                name="name"
                value={name}
                className={classes.textField}
                onChange={(e) => handleOnInputChange(e)}
                autoComplete="off"
              />

              <TextField
                label={<Typography>Genre</Typography>}
                color="secondary"
                fullWidth
                variant="filled"
                name="genre"
                value={genre}
                className={classes.textField}
                onChange={(e) => handleOnInputChange(e)}
                autoComplete="off"
              />

              <TextField
                label={<Typography>Platform</Typography>}
                color="secondary"
                fullWidth
                variant="filled"
                name="platform"
                className={classes.textField}
                multiline
                value={platform}
                onChange={(e) => handleOnInputChange(e)}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                label={<Typography>Release Year</Typography>}
                color="secondary"
                fullWidth
                variant="filled"
                name="release"
                value={release}
                className={classes.textField}
                type="number"
                onChange={(e) => handleOnInputChange(e)}
                autoComplete="off"
              />

              <TextField
                label={<Typography>Image Url</Typography>}
                color="secondary"
                fullWidth
                variant="filled"
                name="image_url"
                value={image_url}
                className={classes.textField}
                multiline
                onChange={(e) => handleOnInputChange(e)}
                autoComplete="off"
              />

              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={singlePlayer === 1 ? true : false}
                      onChange={(e) => handleOnInputChange(e)}
                      name="singlePlayer"
                    />
                  }
                  label="Single Player"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={multiplayer === 1 ? true : false}
                      onChange={(e) => handleOnInputChange(e)}
                      name="multiPlayer"
                    />
                  }
                  label="Multi Player"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Paper>
        <div style={{ textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
          >
            {!id ? "Save" : "Update"}
          </Button>
        </div>
      </form>
      {redirect ? <Redirect to="/admin/games" /> : null}
    </Container>
  );
};

export default FormGames;
