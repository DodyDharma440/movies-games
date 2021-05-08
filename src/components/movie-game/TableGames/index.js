import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Paper,
} from "@material-ui/core";
import { GamesContext } from "context/gamesContext";
import { TableContext } from "context/tableContext";
import { getComparator, stableSort } from "helper/tableHelper";

import TableHeadGames from "components/movie-game/TableHead";
import TableItemGames from "components/movie-game/TableGames/TableItem";

const headCells = [
  { id: "id", numeric: true, label: "ID" },
  { id: "image", numeric: false, label: "Image" },
  { id: "name", numeric: false, label: "Name" },
  { id: "genre", numeric: false, label: "Genre" },
  { id: "platform", numeric: false, label: "Platform" },
  { id: "singlePlayer", numeric: true, label: "Single Player" },
  { id: "multiplayer", numeric: true, label: "Multi Player" },
  { id: "release", numeric: true, label: "Release" },
  { id: "action", numeric: false, label: "Action" },
];

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    background: theme.palette.primary.main,
    borderRadius: 15,
    "@media(max-width: 576px)": {
      width: 400,
    },
  },
  description: {
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const TableGames = ({ searchValue, filterValue }) => {
  const classes = useStyles();
  const { games } = useContext(GamesContext);
  const { pageTable, setPageTable } = useContext(TableContext);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (e, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (e, newPage) => {
    setPageTable(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPageTable(0);
  };

  const filterGames = (type, game) => {
    const { platform, release, genre } = game;
    switch (type) {
      case "platform":
        return filterValue.platform !== ""
          ? platform.toLowerCase().includes(filterValue.platform.toLowerCase())
          : game;

      case "release":
        return filterValue.release !== ""
          ? filterValue.release === release
          : game;

      case "genre":
        return filterValue.genre !== ""
          ? genre.toLowerCase().includes(filterValue.genre.toLowerCase())
          : game;

      default:
        return undefined;
    }
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHeadGames
            headCells={headCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(games, getComparator(order, orderBy))
              .filter((game) => {
                if (searchValue === "") {
                  if (filterValue !== undefined) {
                    return (
                      filterGames("platform", game) &&
                      filterGames("release", game) &&
                      filterGames("genre", game)
                    );
                  } else {
                    return game;
                  }
                } else {
                  return game.name
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
                }
              })
              .slice(
                pageTable * rowsPerPage,
                pageTable * rowsPerPage + rowsPerPage
              )
              .map((game, index) => {
                return <TableItemGames key={index} index={index} game={game} />;
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={games.length}
        rowsPerPage={rowsPerPage}
        page={pageTable}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableGames;
