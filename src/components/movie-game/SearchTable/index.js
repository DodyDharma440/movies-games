import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TableContext } from "context/tableContext";
import { TextField, IconButton } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  inputField: {
    marginRight: theme.spacing(1),
    "& div input": {
      padding: `10px ${theme.spacing(2)}px`,
    },
  },
}));

const SearchTable = ({ searchAction }) => {
  const classes = useStyles();
  const { setPageTable } = useContext(TableContext);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchAction(searchValue);
    setPageTable(0);
  };

  return (
    <form className={classes.root} onSubmit={(e) => handleSearchSubmit(e)}>
      <TextField
        type="search"
        variant="outlined"
        color="secondary"
        value={searchValue}
        onChange={(e) => handleChange(e)}
        className={classes.inputField}
        placeholder="Search by title..."
      />
      <IconButton type="submit">
        <SearchRounded />
      </IconButton>
    </form>
  );
};

export default SearchTable;
