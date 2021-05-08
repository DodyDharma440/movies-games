import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TableContext } from "context/tableContext";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  Button,
  TextField,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dialogForm: {
    width: 500,
    marginBottom: 10,
  },
  form: {
    background: theme.palette.primary.dark,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
}));

const optionRating = [
  { value: 0 },
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: 10 },
];

const optionGenre = [
  { value: "horror", label: "Horror" },
  { value: "action", label: "Action" },
  { value: "drama", label: "Drama" },
  { value: "fantasy", label: "Fantasy" },
  { value: "romance", label: "Romance" },
  { value: "comedy", label: "Comedy" },
  { value: "adventure", label: "Adventure" },
];

const FilterTableMovies = ({ open, onClose, filterAction, resetFilter }) => {
  const classes = useStyles();
  const { setPageTable } = useContext(TableContext);
  const [filterValue, setFilterValue] = useState({
    rating: "",
    genre: "",
    year: "",
  });

  const handleOnInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "rating":
        setFilterValue({ ...filterValue, rating: Number(value) });
        break;
      case "genre":
        setFilterValue({ ...filterValue, genre: value });
        break;
      case "year":
        setFilterValue({ ...filterValue, year: Number(value) });
        break;

      default:
        setFilterValue({ ...filterValue });
        break;
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    filterAction(filterValue);
    setPageTable(0);
  };

  const handleResetFilter = () => {
    setFilterValue({
      rating: "",
      genre: "",
      year: "",
    });
    resetFilter();
    onClose();
    setPageTable(0);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={(e) => handleSubmitForm(e)} className={classes.form}>
        <DialogTitle>Filter Movies</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} className={classes.dialogForm}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                value={filterValue.rating}
                label={<Typography>Rating</Typography>}
                select
                fullWidth
                name="rating"
                onChange={(e) => handleOnInputChange(e)}
              >
                {optionRating.map((option) => {
                  return (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                value={filterValue.genre}
                label={<Typography>Genre</Typography>}
                select
                fullWidth
                name="genre"
                onChange={(e) => handleOnInputChange(e)}
              >
                {optionGenre.map((option) => {
                  return (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                type="number"
                value={filterValue.year}
                fullWidth
                name="year"
                InputProps={{
                  inputProps: { min: 1950 },
                }}
                label={<Typography>Year</Typography>}
                onChange={(e) => handleOnInputChange(e)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            type="button"
            color="primary"
            onClick={() => handleResetFilter()}
            style={{ marginRight: "auto" }}
          >
            Reset
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={onClose}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={onClose}
          >
            Filter
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default FilterTableMovies;
