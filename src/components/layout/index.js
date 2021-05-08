import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "context/userContext";
import { makeStyles } from "@material-ui/core/styles";
import Header from "components/layout/Header";
import Sidebar from "components/layout/Sidebar";
import Footer from "components/layout/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  dynamicPage: {
    marginTop: 74,
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const { userData } = useContext(UserContext);
  const [openSidebar, setOpenSidebar] = useState(false);

  const { isLoggedIn } = userData;

  const handleDrawerAction = () => {
    setOpenSidebar(!openSidebar);
  };

  useEffect(() => {
    if (isLoggedIn) {
      setOpenSidebar(true);
    } else {
      setOpenSidebar(false);
    }
  }, [isLoggedIn]);

  return (
    <div className={classes.root}>
      <Header
        drawerOpen={openSidebar}
        handleDrawerAction={handleDrawerAction}
      />
      {userData.isLoggedIn ? (
        <Sidebar
          drawerOpen={openSidebar}
          handleDrawerAction={handleDrawerAction}
        />
      ) : null}
      <div className={classes.content}>
        <section id="dynamicPage" className={classes.dynamicPage}>
          {children}
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
