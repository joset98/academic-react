/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useContext } from "react";
import {
  Button, CircularProgress, Divider, Paper,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import Text from "components/Text";
import useFetch from "services/useFetch";
import { SnackbarDispatchContext } from "providers/Snackbar/provider";
import { SNACKBAR_SHOW } from "providers/Snackbar/actions";
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Grid from "./styles";

const ModalDeletePayment = ({ onClose, data: dataPayment = {}, reload }) => {
  const { descripcion, idCobro } = dataPayment;
  const dispatch = useContext(SnackbarDispatchContext);
  const { fetch: fetchDelete, loading: loadingFetchDelete } = useFetch({ uri: `/api/cobros/${idCobro}` });

  const handleDelete = async () => {
    if (!loadingFetchDelete) {
      const config = {
        method: "delete",
      };

      const response = await fetchDelete({}, config);

      if (response.status === 201 || response.status === 200 || response.status === 204) {
        reload();
        dispatch({
          type: SNACKBAR_SHOW,
          payload: {
            severity: "success",
            message: `Se eliminó ${descripcion} correctamente`,
          },
        });
        onClose();
      }
    }
  };

  return (
    <Paper>
      <Grid container>
        <Grid item xs={12} styles="header">
          <Text variant="h3">Notificación</Text>
        </Grid>
      </Grid>
      <Grid container styles="containerCommit" spacing={2} justify="center">
        <p>
          ¿Esta seguro que desea eliminar
          {' '}
          <strong>{descripcion}</strong>
          ?
        </p>
      </Grid>
      <Divider />
      <Grid container styles="containerBottom" justify="flex-end">
        <Grid item xs={6} md={3}>
          <Button size="large" fullWidth onClick={() => onClose()}>
            No
          </Button>
        </Grid>
        <Grid item xs={6} md={3}>
          <Button
            fullWidth
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleDelete}
          >
            {loadingFetchDelete ? <CircularProgress size={24} /> : "Si"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ModalDeletePayment;
