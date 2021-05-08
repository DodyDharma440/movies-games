import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MoviesContext } from "context/moviesContext";
import { TableProvider } from "context/tableContext";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, IconButton, Button } from "@material-ui/core";
import { FilterListRounded, AddRounded } from "@material-ui/icons";
import SearchTable from "components/movie-game/SearchTable";
import FilterTableMovies from "components/movie-game/TableMovies/FilterTable";

import TableMovie from "components/movie-game/TableMovies";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  header: {
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
  },
}));

const Movies = () => {
  const classes = useStyles();
  const { setMovies } = useContext(MoviesContext);
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [filterValue, setFilterValue] = useState(undefined);

  const searchAction = (value) => {
    setInputSearchValue(value);
    setFilterValue(undefined);
  };

  const filterAction = (value) => {
    const { rating, genre, year } = value;
    setFilterValue({
      rating,
      genre,
      year,
    });
    setInputSearchValue("");
  };

  const resetFilter = () => {
    setFilterValue(undefined);
  };

  const handleOpenMenu = (e) => {
    setOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  useEffect(() => {
    let url = "https://backendexample.sanbersy.com/api/data-movie";
    axios.get(url).then((res) => {
      setMovies(res.data);
    });
  }, [setMovies]);

  return (
    <TableProvider>
      <div className={classes.root}>
        <Container maxWidth="lg">
          <div className={classes.header}>
            <Typography variant="h5" style={{ flex: "1" }}>
              Data Movies
            </Typography>
            <SearchTable searchAction={searchAction} />
            <IconButton
              style={{ margin: "0 5px" }}
              onClick={(e) => handleOpenMenu(e)}
            >
              <FilterListRounded />
            </IconButton>
            <FilterTableMovies
              open={openMenu}
              onClose={handleCloseMenu}
              filterAction={filterAction}
              resetFilter={resetFilter}
            />
            <Link
              to="/admin/movies/add-data"
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddRounded />}
              >
                Add Data
              </Button>
            </Link>
          </div>
          <TableMovie
            searchValue={inputSearchValue}
            filterValue={filterValue}
          />
        </Container>
      </div>
    </TableProvider>
  );
};

export default Movies;
