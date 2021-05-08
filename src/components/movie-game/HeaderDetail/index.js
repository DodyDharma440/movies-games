import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 150,
    marginTop: -10,
  },
  blur: {
    backdropFilter: "blur(10px)",
    width: "100%",
    height: "100%",
  },
}));

const HeaderDetail = ({ image }) => {
  const classes = useStyles();
  return (
    <div
      style={{
        background: `url('${image}') center center / cover`,
      }}
      className={classes.root}
    >
      <div className={classes.blur} />
    </div>
  );
};

export default HeaderDetail;
