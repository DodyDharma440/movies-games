import React, { useContext, useState } from "react";
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
import { Visibility, VisibilityOff, QueueRounded } from "@material-ui/icons";
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

const Register = () => {
  const { setUserData } = useContext(UserContext);
  const classes = useStyles();
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    showPassword: false,
  });
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);

  const handleOnInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setInputValue({ ...inputValue, name: value });
        break;
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
    const { name, email, password } = inputValue;
    let url = "https://backendexample.sanbersy.com/api/register";
    axios
      .post(url, {
        name,
        email,
        password,
      })
      .then((res) => {
        const { user, token } = res.data;
        const currentUser = {
          name: user.name,
          email: user.email,
          token,
          isLoggedIn: false,
        };
        setUserData(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
        setSuccessMessage("Success to register new account");
        setErrorMessage(undefined);
        setInputValue({
          name: "",
          email: "",
          password: "",
          showPassword: false,
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setSuccessMessage(undefined);
      });
  };

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Paper className={classes.iconWrapper}>
          <QueueRounded style={{ fontSize: 30 }} />
        </Paper>
        <Typography variant="h4" style={{ marginBottom: 8 }}>
          Register
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
            htmlFor="name-field"
            style={{ color: "#fff" }}
            className={classes.labelStyle}
          >
            Name
          </InputLabel>
          <OutlinedInput
            id="name-field"
            type="text"
            name="name"
            value={inputValue.name}
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
            required
            autoComplete="off"
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
            required
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
          />
        </FormControl>

        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
          >
            Register
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

export default Register;
