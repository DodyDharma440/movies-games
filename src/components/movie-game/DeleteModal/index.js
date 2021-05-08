import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperModal: {
    minHeight: 100,
    width: 400,
    backgroundColor: theme.palette.primary.dark,
    boxShadow: theme.shadows[5],
    borderRadius: 15,
    "&:focus": {
      outline: "none",
    },
  },
  modalBody: {
    padding: theme.spacing(3),
  },
  modalFooter: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const DeleteModal = ({ open, onClose, id, title, handleDeleteClick }) => {
  const classes = useStyles();
  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open} disableStrictModeCompat>
        <div className={classes.paperModal}>
          <div className={classes.modalBody}>
            <Typography>
              Are you sure to delete <b>{title}</b> ?
            </Typography>
          </div>
          <Divider />
          <div className={classes.modalFooter}>
            <Button
              onClick={onClose}
              variant="contained"
              color="primary"
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDeleteClick(id)}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default DeleteModal;
