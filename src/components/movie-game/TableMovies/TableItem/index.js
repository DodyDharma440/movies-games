import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Link } from "react-router-dom";
import { TableRow, TableCell, IconButton, Typography } from "@material-ui/core";
import { EditRounded, DeleteForeverRounded } from "@material-ui/icons";
import DeleteModal from "components/movie-game/DeleteModal";
import { UserContext } from "context/userContext";
import { MoviesContext } from "context/moviesContext";

const useStyles = makeStyles((theme) => ({
  description: {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    width: 120,
  },
}));

const TableItemMovies = ({ index, movie }) => {
  const classes = useStyles();
  const { movies, setMovies } = useContext(MoviesContext);
  const { userData } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  const {
    id,
    title,
    description,
    year,
    duration,
    genre,
    rating,
    image_url,
    review,
  } = movie;

  const handleDeleteClick = (id) => {
    let url = `https://backendexample.sanbersy.com/api/data-movie/${id}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then(() => {
        setOpenModal(false);
        movies.splice(
          movies.findIndex((movie) => movie.id === id),
          1
        );
        setMovies([...movies]);
      });
  };

  return (
    <TableRow key={index}>
      <TableCell style={{ width: 20 }}>{index + 1}</TableCell>
      <TableCell>
        <img
          src={image_url}
          style={{ width: 80, height: 130 }}
          alt={`movie-${id}`}
        />
      </TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{genre}</TableCell>
      <TableCell style={{ width: 100 }}>
        <Typography variant="body2" className={classes.description}>
          {description}
        </Typography>
      </TableCell>
      <TableCell>{rating}</TableCell>
      <TableCell>{duration}</TableCell>
      <TableCell>{year}</TableCell>
      <TableCell>
        <Typography
          variant="body2"
          className={classes.description}
          style={{ width: 50 }}
        >
          {review}
        </Typography>
      </TableCell>
      <TableCell style={{ width: 150 }}>
        <Link to={`/admin/movies/edit-data/${id}`}>
          <IconButton>
            <EditRounded />
          </IconButton>
        </Link>
        <IconButton onClick={() => setOpenModal(true)}>
          <DeleteForeverRounded />
        </IconButton>
        <DeleteModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          id={id}
          title={title}
          handleDeleteClick={handleDeleteClick}
        />
      </TableCell>
    </TableRow>
  );
};

export default TableItemMovies;
