import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "context/userContext";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  IconButton,
  FormControl,
  OutlinedInput,
  InputLabel,
  Typography,
  Paper,
  InputAdornment,
  Button,
} from "@material-ui/core";
import {
  Visibility,
  VisibilityOff,
  VerifiedUserRounded,
} from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: `${theme.spacing(3)}px ${theme.spacing(4)}px`,
    maxWidth: "70%",
    margin: `0px auto ${theme.spacing(3)}px auto`,
    background: theme.palette.primary.dark,
    borderRadius: 15,
  },
  iconWrapper: {
    background: theme.palette.secondary.main,
    width: 80,
    height: 80,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 6px auto",
  },
  inputSpacing: {
    marginBottom: theme.spacing(4),
  },
  labelStyle: {
    padding: "0 8px",
    background: theme.palette.primary.dark,
  },
}));

const ChangePassword = () => {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  const [inputValue, setInputValue] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showCurrent: false,
    showNew: false,
    showConfirm: false,
  });
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);

  const handleOnInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "current":
        setInputValue({ ...inputValue, currentPassword: value });
        break;
      case "new":
        setInputValue({ ...inputValue, newPassword: value });
        break;
      case "confirm":
        setInputValue({ ...inputValue, confirmPassword: value });
        break;

      default:
        break;
    }
  };

  const handleClickShowPassword = (type) => {
    switch (type) {
      case "current":
        setInputValue({ ...inputValue, showCurrent: !inputValue.showCurrent });
        break;
      case "new":
        setInputValue({ ...inputValue, showNew: !inputValue.showNew });
        break;
      case "confirm":
        setInputValue({ ...inputValue, showConfirm: !inputValue.showConfirm });
        break;

      default:
        break;
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const { newPassword, currentPassword, confirmPassword } = inputValue;
    if (newPassword === confirmPassword) {
      let url = "https://backendexample.sanbersy.com/api/change-password";
      axios
        .post(
          url,
          {
            current_password: currentPassword,
            new_password: newPassword,
            new_confirm_password: confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        )
        .then(() => {
          setInputValue({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            showCurrent: false,
            showNew: false,
            showConfirm: false,
          });
          setSuccessMessage("Success change password");
          setErrorMessage(undefined);
        })
        .catch((err) => {
          setErrorMessage(err.message);
          setSuccessMessage(undefined);
        });
    } else {
      setErrorMessage("Confirm password doesn't match.");
      setSuccessMessage(undefined);
    }
  };

  return (
    <Container>
      <Paper className={classes.paper}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Paper className={classes.iconWrapper}>
            <VerifiedUserRounded style={{ fontSize: 30 }} />
          </Paper>
          <Typography variant="h4" style={{ marginBottom: 8 }}>
            Change Password
          </Typography>
          {errorMessage ? (
            <Alert severity="error">{errorMessage}</Alert>
          ) : successMessage ? (
            <Alert severity="success">{successMessage}</Alert>
          ) : null}
        </div>
        <form onSubmit={(e) => handleSubmitForm(e)}>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.inputSpacing}
          >
            <InputLabel
              htmlFor="password-field"
              style={{ color: "#fff" }}
              className={classes.labelStyle}
            >
              Current Password
            </InputLabel>
            <OutlinedInput
              id="current-password"
              type={inputValue.showCurrent ? "text" : "password"}
              name="current"
              value={inputValue.currentPassword}
              onChange={(e) => handleOnInputChange(e)}
              color="secondary"
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("current")}
                    edge="end"
                  >
                    {inputValue.showCurrent ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl
            fullWidth
            variant="outlined"
            className={classes.inputSpacing}
          >
            <InputLabel
              htmlFor="password-field"
              style={{ color: "#fff" }}
              className={classes.labelStyle}
            >
              New Password
            </InputLabel>
            <OutlinedInput
              id="new-password"
              type={inputValue.showNew ? "text" : "password"}
              name="new"
              value={inputValue.newPassword}
              onChange={(e) => handleOnInputChange(e)}
              color="secondary"
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("new")}
                    edge="end"
                  >
                    {inputValue.showNew ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl
            fullWidth
            variant="outlined"
            className={classes.inputSpacing}
          >
            <InputLabel
              htmlFor="password-field"
              style={{ color: "#fff" }}
              className={classes.labelStyle}
            >
              Confirm New Password
            </InputLabel>
            <OutlinedInput
              id="confirm-new-password"
              type={inputValue.showConfirm ? "text" : "password"}
              name="confirm"
              value={inputValue.confirmPassword}
              onChange={(e) => handleOnInputChange(e)}
              color="secondary"
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("confirm")}
                    edge="end"
                  >
                    {inputValue.showConfirm ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
            >
              Change Password
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default ChangePassword;
