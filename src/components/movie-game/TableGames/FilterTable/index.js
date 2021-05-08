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

const optionPlatform = [
  { value: "ps", label: "PS" },
  { value: "xbox", label: "XBOX" },
  { value: "pc", label: "PC" },
  { value: "android", label: "Android" },
  { value: "ios", label: "iOs" },
  { value: "console", label: "Console" },
];

const optionGenre = [
  { value: "fps", label: "FPS" },
  { value: "fighting", label: "Fighting" },
  { value: "open world", label: "Open World" },
  { value: "survival", label: "Survival" },
  { value: "racing", label: "Racing" },
  { value: "battle royale", label: "Battle Royale" },
  { value: "moba", label: "MOBA" },
  { value: "simulation", label: "Simulation" },
  { value: "strategy", label: "Strategy" },
  { value: "adventure", label: "Adventure" },
  { value: "sport", label: "Sport" },
];

const FilterTableGames = ({ open, onClose, filterAction, resetFilter }) => {
  const classes = useStyles();
  const { setPageTable } = useContext(TableContext);
  const [filterValue, setFilterValue] = useState({
    platform: "",
    genre: "",
    release: "",
  });

  const handleOnInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "platform":
        setFilterValue({ ...filterValue, platform: value });
        break;
      case "genre":
        setFilterValue({ ...filterValue, genre: value });
        break;
      case "release":
        setFilterValue({ ...filterValue, release: value });
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
      platform: "",
      genre: "",
      release: "",
    });
    resetFilter();
    onClose();
    setPageTable(0);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={(e) => handleSubmitForm(e)} className={classes.form}>
        <DialogTitle>Filter Games</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} className={classes.dialogForm}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                value={filterValue.platform}
                label={<Typography>Platform</Typography>}
                select
                fullWidth
                name="platform"
                onChange={(e) => handleOnInputChange(e)}
              >
                {optionPlatform.map((option) => {
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
                value={filterValue.release}
                fullWidth
                name="release"
                InputProps={{
                  inputProps: { min: 1980 },
                }}
                label={<Typography>Release</Typography>}
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

export default FilterTableGames;
