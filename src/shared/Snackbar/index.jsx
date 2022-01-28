import React, { useContext, useEffect, useState } from "react";
import { Snackbar as TemplateSnackbar } from "@material-ui/core";
import {
  SnackbarContext,
  SnackbarDispatchContext,
} from "providers/Snackbar/provider";
import { SNACKBAR_HIDDEN } from "providers/Snackbar/actions";
import Alert from "@material-ui/lab/Alert";

const Snackbar = () => {
  const snackbar = useContext(SnackbarContext);
  const dispatch = useContext(SnackbarDispatchContext);
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: SNACKBAR_HIDDEN });
  };

  useEffect(() => {
    if (snackbar.message !== null) {
      setTimeout(() => {
        setOpen(false);
        dispatch({ type: SNACKBAR_HIDDEN });
      }, 6000);
    } else {
      setOpen(true);
    }
  }, [snackbar]);

  return (
    snackbar.message && (
      <TemplateSnackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        autoHideDuration={6000}
        open={open}
      >
        <Alert onClose={handleClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </TemplateSnackbar>
    )
  );
};

export default Snackbar;
