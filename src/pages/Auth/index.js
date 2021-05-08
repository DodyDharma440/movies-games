import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Tabs, Tab, Typography } from "@material-ui/core";

import Login from "components/auth/Login";
import Register from "components/auth/Register";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    marginTop: -10,
  },
  gridImage: {
    background: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 768px)": {
      display: "none",
    },
  },
  tabWrapper: {
    background: theme.palette.primary.dark,
  },
  gridForm: {
    padding: `${theme.spacing(5)}px ${theme.spacing(4)}px`,
  },
}));

const TabPanel = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabs-auth-${index}`}
      aria-labelledby={`tab-auth${index}`}
      style={{
        padding: "24px 32px",
      }}
    >
      {value === index && children}
    </div>
  );
};

const Auth = () => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Grid container style={{ minHeight: "100vh" }}>
        <Grid item xs={12} md={5}>
          <div className={classes.tabWrapper}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              centered
              variant="fullWidth"
            >
              <Tab label={<Typography>Login</Typography>} />
              <Tab label={<Typography>Register</Typography>} />
            </Tabs>
          </div>
          <TabPanel value={tabValue} index={0}>
            <Login />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Register />
          </TabPanel>
        </Grid>
        <Grid item xs={false} md={7} className={classes.gridImage}>
          <img
            src="https://www.2steps.io/hubfs/2Setps/Assets/technology.png"
            style={{ width: 400, height: 400 }}
            alt="Auth illustration"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Auth;
