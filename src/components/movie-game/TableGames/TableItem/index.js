import React, { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "context/userContext";
import { GamesContext } from "context/gamesContext";
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import { EditRounded, DeleteForeverRounded } from "@material-ui/icons";
import DeleteModal from "components/movie-game/DeleteModal";

const TableItemGames = ({ index, game }) => {
  const { userData } = useContext(UserContext);
  const { games, setGames } = useContext(GamesContext);
  const [openModal, setOpenModal] = useState(false);
  const {
    id,
    name,
    platform,
    release,
    singlePlayer,
    multiplayer,
    genre,
    image_url,
  } = game;

  const handleDeleteClick = (id) => {
    let url = `https://backendexample.sanbersy.com/api/data-game/${id}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then(() => {
        setOpenModal(false);
        games.splice(
          games.findIndex((game) => game.id === id),
          1
        );
        setGames([...games]);
      });
  };

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <img
          src={image_url}
          style={{ width: 80, height: 130 }}
          alt={`game-${id}`}
        />
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{genre}</TableCell>
      <TableCell>{platform}</TableCell>
      <TableCell>{singlePlayer === 1 ? "Yes" : "No"}</TableCell>
      <TableCell>{multiplayer === 1 ? "Yes" : "No"}</TableCell>
      <TableCell>{release}</TableCell>
      <TableCell style={{ width: 100 }}>
        <Link to={`/admin/games/edit-data/${id}`}>
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
          title={name}
          handleDeleteClick={handleDeleteClick}
        />
      </TableCell>
    </TableRow>
  );
};

export default TableItemGames;
