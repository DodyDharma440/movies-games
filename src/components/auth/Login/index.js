import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "context/userContext";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  FormControl,
  OutlinedInput,
  InputLabel,
  Typography,
  Paper,
  InputAdornment,
  Button,
} from "@material-ui/core";
import { Visibility, VisibilityOff, LockRounded } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
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
    background: theme.palette.background.default,
  },
}));

const Login = () => {
  const classes = useStyles();
  const { setUserData } = useContext(UserContext);
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleOnInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setInputValue({ ...inputValue, email: value });
        break;
      case "password":
        setInputValue({ ...inputValue, password: value });
        break;
      default:
        return undefined;
    }
  };

  const handleClickShowPassword = () => {
    setInputValue({ ...inputValue, showPassword: !inputValue.showPassword });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const { email, password } = inputValue;
    let url = "https://backendexample.sanbersy.com/api/user-login";
    axios
      .post(url, { email, password })
      .then((res) => {
        const { user, token } = res.data;
        const currentUser = {
          name: user.name,
          email: user.email,
          token,
          isLoggedIn: true,
        };
        setUserData(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
        setErrorMessage(undefined);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Paper className={classes.iconWrapper}>
          <LockRounded style={{ fontSize: 30 }} />
        </Paper>
        <Typography variant="h4" style={{ marginBottom: 8 }}>
          Login
        </Typography>
        {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
      </div>
      <form onSubmit={(e) => handleSubmitForm(e)}>
        <FormControl
          fullWidth
          variant="outlined"
          className={classes.inputSpacing}
        >
          <InputLabel
            htmlFor="email-field"
            style={{ color: "#fff" }}
            className={classes.labelStyle}
          >
            Email
          </InputLabel>
          <OutlinedInput
            id="email-field"
            type="email"
            name="email"
            value={inputValue.email}
            onChange={(e) => handleOnInputChange(e)}
            color="secondary"
            autoComplete="off"
            required
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
            Password
          </InputLabel>
          <OutlinedInput
            id="password-field"
            type={inputValue.showPassword ? "text" : "password"}
            name="password"
            value={inputValue.password}
            onChange={(e) => handleOnInputChange(e)}
            color="secondary"
            autoComplete="off"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {inputValue.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            required
          />
        </FormControl>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
          >
            Login
          </Button>
        </div>
      </form>
      <div style={{ textAlign: "center" }}>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          {"Movies & Games"}
        </Typography>
        <Typography variant="caption">Copyright 2021</Typography>
      </div>
    </>
  );
};

export default Login;
