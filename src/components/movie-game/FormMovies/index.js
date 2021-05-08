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

const FormMovies = ({ location }) => {
  const classes = useStyles();
  let { id } = useParams();
  const { userData } = useContext(UserContext);
  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
    year: 1950,
    duration: 0,
    genre: "",
    rating: 0,
    review: "",
    image_url: "",
  });
  const [redirect, setRedirect] = useState(false);

  const handleOnInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "title":
        setInputValue({ ...inputValue, title: value });
        break;
      case "description":
        setInputValue({ ...inputValue, description: value });
        break;
      case "year":
        setInputValue({ ...inputValue, year: value });
        break;
      case "duration":
        setInputValue({ ...inputValue, duration: value });
        break;
      case "genre":
        setInputValue({ ...inputValue, genre: value });
        break;
      case "rating":
        setInputValue({ ...inputValue, rating: value });
        break;
      case "review":
        setInputValue({ ...inputValue, review: value });
        break;
      case "image":
        setInputValue({ ...inputValue, image_url: value });
        break;
      default:
        setInputValue({ ...inputValue });
        break;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let url = "https://backendexample.sanbersy.com/api/data-movie";
    axios
      .post(url, inputValue, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        setInputValue({
          title: "",
          description: "",
          year: 1950,
          duration: 0,
          genre: "",
          rating: 0,
          review: "",
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
    let url = `https://backendexample.sanbersy.com/api/data-movie/${id}`;
    axios
      .put(url, inputValue, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        setInputValue({
          title: "",
          description: "",
          year: 1950,
          duration: 0,
          genre: "",
          rating: 0,
          review: "",
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
        .get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
        .then((res) => {
          setInputValue(res.data);
        });
    }
  }, [id]);

  const {
    title,
    description,
    year,
    duration,
    genre,
    rating,
    review,
    image_url,
  } = inputValue;

  return (
    <Container className={classes.root}>
      <Typography variant="h5" style={{ marginBottom: 10 }}>
        Form Movies
      </Typography>
      <form
        onSubmit={(e) => (!id ? handleFormSubmit(e) : handleFormEditSubmit(e))}
      >
        <Paper className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <TextField
                label={<Typography>Title</Typography>}
                color="secondary"
                fullWidth
                variant="filled"
                name="title"
                value={title}
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
                label={<Typography>Description</Typography>}
                color="secondary"
                fullWidth
                variant="filled"
                name="description"
                className={classes.textField}
                multiline
                value={description}
                onChange={(e) => handleOnInputChange(e)}
                autoComplete="off"
              />

              <TextField
                label={<Typography>Image Url</Typography>}
                color="secondary"
                fullWidth
                variant="filled"
                name="image"
                value={image_url}
                className={classes.textField}
                multiline
                onChange={(e) => handleOnInputChange(e)}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                label={<Typography>Rating</Typography>}
                color="secondary"
                fullWidth
                variant="filled"
                className={classes.textField}
                type="number"
                name="rating"
                value={rating}
                InputProps={{ inputProps: { min: 0, max: 10 } }}
                onChange={(e) => handleOnInputChange(e)}
                autoComplete="off"
              />

              <TextField
                label={<Typography>Duration (minutes)</Typography>}
                color="secondary"
                fullWidth
                variant="filled"
                name="duration"
                value={duration}
                className={classes.textField}
                type="number"
                onChange={(e) => handleOnInputChange(e)}
                autoComplete="off"
              />

              <TextField
                label={<Typography>Year</Typography>}
                color="secondary"
                fullWidth
                variant="filled"
                name="year"
                value={year}
                className={classes.textField}
                type="number"
                onChange={(e) => handleOnInputChange(e)}
                autoComplete="off"
              />

              <TextField
                label={<Typography>Review</Typography>}
                color="secondary"
                fullWidth
                variant="filled"
                name="review"
                value={review}
                className={classes.textField}
                multiline
                onChange={(e) => handleOnInputChange(e)}
                autoComplete="off"
              />
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
      {redirect ? <Redirect to="/admin/movies" /> : null}
    </Container>
  );
};

export default FormMovies;
