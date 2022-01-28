/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useContext, useEffect } from "react";
import {
  Button, CircularProgress, Divider, FilledInput,
  FormHelperText, InputAdornment, InputLabel, MenuItem, Paper, Select,
} from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { LocalAtm, AttachFile } from "@material-ui/icons";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import Text from "components/Text";
import useFetch from "services/useFetch";
import globals from "utils/globals";
import { SnackbarDispatchContext } from "providers/Snackbar/provider";
import { SNACKBAR_SHOW } from "providers/Snackbar/actions";
import validation from "./validation";
import { Grid, FormControl } from "./styles";

const ModalRegisterPayment = ({ onClose, match, reload, paymentImport }) => {
  const { id } = match.params;
  const { register, handleSubmit, control, errors, watch, reset, setValue } = useForm({ resolver: validation });
  const file = watch('evidencia');
  const dispatch = useContext(SnackbarDispatchContext);
  const { fetch: submit, loading: loadingSubmit } = useFetch({ uri: "/api/pagos" });

  useEffect(() => {
    setValue('importePendiente', paymentImport);
  }, [paymentImport]);

  const encodeImageFileAsURL = async (img) => {
    const reader = new FileReader();
    await new Promise((resolve, reject) => {
      reader.onloadend = resolve;
      reader.onerror = reject;
      reader.readAsDataURL(img);
    });
    return reader.result.replace(/^data:.+;base64,/, '')
  };

  const onSubmit = async (data) => {
    if (!loadingSubmit) {
      const config = {
        method: "post",
        contentType: 'multipart/form-data',
      };
      const dataToSend = {
        idCobro: id,
        canal: "WE",
        ...data,
        importe: paymentImport,
        evidencia: {
          extension: data.evidencia[0].type.split('/')[1],
          data: await encodeImageFileAsURL(data.evidencia[0])
        }
      }

      const response = await submit(dataToSend, config);

      if (response.status === 201 || response.status === 200) {
        reload();
        dispatch({
          type: SNACKBAR_SHOW,
          payload: {
            severity: "success",
            message: "Pago registrado correctamente",
          },
        });
        reset();
        onClose();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper>
        <Grid container>
          <Grid item xs={12} styles="header">
            <Text variant="h3">Añadir Pago</Text>
          </Grid>
        </Grid>
        <Grid container styles="container" spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl variant="filled">
              <InputLabel htmlFor="importePendiente">Importe pendiente</InputLabel>
              <Controller
                readOnly
                name="importePendiente"
                control={control}
                defaultValue="0"
                as={(
                  <FilledInput
                    autoComplete='off'
                    id="importePendiente"
                    error={errors.importePendiente}
                    placeholder="importePendiente"
                    startAdornment={(
                      <InputAdornment position="start">
                        <LocalAtm />
                      </InputAdornment>
                    )}
                  />
                )}
              />
              {errors.importePendiente && (
                <FormHelperText error>{errors.importePendiente.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          {/* <Grid item xs={6}>
            <FormControl variant="filled">
              <InputLabel htmlFor="importe">Importe a pagar</InputLabel>
              <Controller
                name="importe"
                control={control}
                defaultValue=""
                as={(
                  <FilledInput
                    type="number"
                    autoComplete='off'
                    id="importe"
                    error={errors.importe}
                    placeholder="importe"
                    InputProps={{
                      readOnly: true,
                    }}
                    startAdornment={(
                      <InputAdornment position="start">
                        <LocalAtm />
                      </InputAdornment>
                    )}
                  />
                )}
              />
              {errors.importe && (
                <FormHelperText error>{errors.importe.message}</FormHelperText>
              )}
            </FormControl>
          </Grid> */}
          <Grid item xs={12} md={4}>
            <FormControl variant="filled">
              <InputLabel htmlFor="medio">Medio de pago</InputLabel>
              <Controller
                as={Select}
                defaultValue=""
                id="medio"
                control={control}
                name="medio"
                autoComplete='off'
                placeholder="Medio"
                error={errors.medio}
                startAdornment={(
                  <InputAdornment position="start">
                    <AccountBalanceWalletIcon />
                  </InputAdornment>
                )}
              >
                {globals.MEDIO_PAGO_STUDENT.map((e) => (
                  <MenuItem value={e.value}>{e.label}</MenuItem>
                ))}
              </Controller>
              {errors.medio && (
                <FormHelperText error>
                  {errors.medio.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="filled">
              <InputLabel htmlFor="referencia">
                Referencia
              </InputLabel>
              <Controller
                as={FilledInput}
                control={control}
                id="referencia"
                name="referencia"
                autoComplete='off'
                placeholder="Número de referencia"
                error={errors.referencia}
                startAdornment={(
                  <InputAdornment position="start">
                    <ConfirmationNumberIcon />
                  </InputAdornment>
                )}
              />
              {errors.referencia && (
                <FormHelperText error>
                  {errors.referencia.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="filled" styles="inputFile">
              <label htmlFor="evidencia">
                <Button variant="contained" size="large" component="span" color="primary">
                  Adjuntar Evidencia
                </Button>
              </label>
              <FilledInput
                readOnly
                type="text"
                autoComplete='off'
                error={errors.evidencia}
                placeholder="Ningún archivo seleccionado"
                value={file && file[0] && file[0].name}
                endAdornment={(
                  <InputAdornment position="center">
                    <AttachFile />
                  </InputAdornment>
                )}
              />
              <FilledInput
                type="file"
                id="evidencia"
                accept="image/*"
                name="evidencia"
                inputRef={register}
                style={{ display: 'none' }}
              />
              {errors.evidencia && (
                <Grid item xs={12}>
                  <FormHelperText error>
                    {errors.evidencia.message}
                  </FormHelperText>
                </Grid>
              )}
            </FormControl>
          </Grid>
        </Grid>
        <Divider />
        <Grid container styles="containerBottom" justify="flex-end">
          <Grid item xs={6} md={3}>
            <Button size="large" fullWidth onClick={() => { reset(); onClose(); }}>
              Cancelar
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="secondary"
            >
              {loadingSubmit ? <CircularProgress size={24} /> : "Pagar"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default withRouter(ModalRegisterPayment);
