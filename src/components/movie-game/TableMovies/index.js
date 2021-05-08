import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MoviesContext } from "context/moviesContext";
import { TableContext } from "context/tableContext";
import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Paper,
} from "@material-ui/core";
import { getComparator, stableSort } from "helper/tableHelper";

import TableItemMovies from "components/movie-game/TableMovies/TableItem";
import TableHeadMovies from "components/movie-game/TableHead";

const headCells = [
  { id: "id", numeric: false, label: "ID" },
  { id: "image", numeric: false, label: "Image" },
  { id: "title", numeric: false, label: "Title" },
  { id: "genre", numeric: false, label: "Genre" },
  { id: "description", numeric: false, label: "Description" },
  { id: "rating", numeric: true, label: "Rating" },
  { id: "duration", numeric: true, label: "Duration (min)" },
  { id: "year", numeric: true, label: "Year" },
  { id: "review", numeric: false, label: "Review" },
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
}));

const TableMovie = ({ searchValue, filterValue }) => {
  const classes = useStyles();
  const { movies } = useContext(MoviesContext);
  const { pageTable, setPageTable } = useContext(TableContext);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const filterMovies = (type, movie) => {
    const { rating, year, genre } = movie;
    switch (type) {
      case "rating":
        return filterValue.rating !== ""
          ? Number(filterValue.rating) === rating
          : movie;

      case "year":
        return filterValue.year !== ""
          ? Number(filterValue.year) === year
          : movie;

      case "genre":
        return filterValue.genre !== ""
          ? genre.toLowerCase().includes(filterValue.genre.toLowerCase())
          : movie;

      default:
        return undefined;
    }
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table style={{ maxWidth: "100%" }}>
          <TableHeadMovies
            headCells={headCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(movies, getComparator(order, orderBy))
              .filter((movie) => {
                if (searchValue === "") {
                  if (filterValue !== undefined) {
                    return (
                      filterMovies("rating", movie) &&
                      filterMovies("year", movie) &&
                      filterMovies("genre", movie)
                    );
                  } else {
                    return movie;
                  }
                } else {
                  return movie.title
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
                }
              })
              .slice(
                pageTable * rowsPerPage,
                pageTable * rowsPerPage + rowsPerPage
              )
              .map((movie, index) => {
                return (
                  <TableItemMovies key={index} index={index} movie={movie} />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={movies.length}
        rowsPerPage={rowsPerPage}
        page={pageTable}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableMovie;
