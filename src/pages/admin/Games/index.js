import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { TableProvider } from "context/tableContext";
import { GamesContext } from "context/gamesContext";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, IconButton, Button } from "@material-ui/core";
import { FilterListRounded, AddRounded } from "@material-ui/icons";
import TableGames from "components/movie-game/TableGames";
import SearchTable from "components/movie-game/SearchTable";
import FilterTableGames from "components/movie-game/TableGames/FilterTable";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  header: {
    display: "flex",
    marginBottom: 10,
    alignItems: "center",
  },
}));

const Games = () => {
  const classes = useStyles();
  const { setGames } = useContext(GamesContext);
  const [inputSearchValue, setInputSearchValue] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [filterValue, setFilterValue] = useState(undefined);

  const searchAction = (value) => {
    setInputSearchValue(value);
  };

  const filterAction = (value) => {
    const { platform, genre, release } = value;
    setFilterValue({
      platform,
      genre,
      release,
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
    let url = "https://backendexample.sanbersy.com/api/data-game";
    axios.get(url).then((res) => {
      setGames(res.data);
    });
  }, [setGames]);

  return (
    <TableProvider>
      <div className={classes.root}>
        <Container maxWidth="lg">
          <div className={classes.header}>
            <Typography variant="h5" style={{ flex: "1" }}>
              Data Games
            </Typography>
            <SearchTable searchAction={searchAction} />
            <IconButton
              style={{ margin: "0 5px" }}
              onClick={(e) => handleOpenMenu(e)}
            >
              <FilterListRounded />
            </IconButton>
            <FilterTableGames
              open={openMenu}
              onClose={handleCloseMenu}
              filterAction={filterAction}
              resetFilter={resetFilter}
            />
            <Link to="/admin/games/add-data" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddRounded />}
              >
                Add Data
              </Button>
            </Link>
          </div>
          <TableGames
            searchValue={inputSearchValue}
            filterValue={filterValue}
          />
        </Container>
      </div>
    </TableProvider>
  );
};

export default Games;
