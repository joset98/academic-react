/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useContext } from "react";
import {
  Button, CircularProgress, Divider, Paper, FilledInput,
  InputLabel, FormHelperText, InputAdornment
} from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import Text from "components/Text";
import useFetch from "services/useFetch";
import { SnackbarDispatchContext } from "providers/Snackbar/provider";
import { SNACKBAR_SHOW } from "providers/Snackbar/actions";
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import validation from "./validation";
import { Grid, FormControl } from "./styles";

const ModalValidatePayment = ({ onClose, reload, data: dataPayment = {}, onCloseDetail }) => {
  const { type, idPago } = dataPayment;
  const { handleSubmit, control, errors, reset } = useForm({ resolver: validation });
  const dispatch = useContext(SnackbarDispatchContext);
  const { fetch: submit, loading: loadingSubmit } = useFetch({ method: "post" });

  const onSubmit = async (data) => {
    const { commit } = data;
    if (!loadingSubmit) {
      const config = {
        method: "post",
        contentType: 'multipart/form-data',
        url: '/api/pagos/recibir'
      };
      const dataToSend = {
        idPago,
        comentario: commit,
        aceptado: !!type,
      }

      const response = await submit(dataToSend, config);

      if (response.status === 201 || response.status === 200) {
        reload();
        dispatch({
          type: SNACKBAR_SHOW,
          payload: {
            severity: "success",
            message: "Pago validado correctamente",
          },
        });
        reset();
        onClose();
        setTimeout(() => {
          onCloseDetail();
        }, 200);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper>
        <Grid container>
          <Grid item xs={12} styles="header">
            <Text variant="h3">{`¿Desea ${type ? 'Validar' : 'Rechazar'} el Pago?`}</Text>
          </Grid>
        </Grid>
        <Grid container styles="containerCommit" spacing={2}>
          <FormControl variant="filled">
            <InputLabel htmlFor="commit">Comentario</InputLabel>
            <Controller
              name="commit"
              control={control}
              defaultValue=""
              as={(
                <FilledInput
                  type="text"
                  autoComplete='off'
                  id="commit"
                  error={errors.commit}
                  placeholder="Escribe un comentario"
                  startAdornment={(
                    <InputAdornment position="start">
                      <ChatBubbleIcon />
                    </InputAdornment>
                    )}
                />
                )}
            />
            {errors.commit && (
            <FormHelperText error>{errors.commit.message}</FormHelperText>
              )}
          </FormControl>
        </Grid>
        <Divider />
        <Grid container styles="container" justify="flex-end" spacing={2}>
          <Grid item xs={2}>
            <Button size="large" fullWidth onClick={() => { reset(); onClose(); }}>
              No
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="secondary"
            >
              {loadingSubmit ? <CircularProgress size={24} /> : "Si"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default withRouter(ModalValidatePayment);
