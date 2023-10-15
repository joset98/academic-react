/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
  Button, CircularProgress, Divider, FilledInput,
  InputAdornment, InputLabel, Paper, Chip
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { LocalAtm } from "@material-ui/icons";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import Text from "components/Text";
import globals from "utils/globals";
import CommentIcon from '@material-ui/icons/Comment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { Grid, FormControl } from "./styles";

const ModalDetailPayment = ({ onClose, dataPayment, handleValidateModal }) => {
  const { dataEvidencia, extension, idPago, estado, comentario } = dataPayment;
  const { control, setValue } = useForm();
  const [imgEvidence, setImgEvidence] = useState('');

  useEffect(() => {
    if (dataPayment.idPago) {
      ['fechaPago', 'medio', 'referencia', 'total', 'comentario'].forEach((e) => {
        if (e === 'medio') {
          setValue(e, globals.MEDIO_PAGO_ADMIN.find((op) => op.value === dataPayment[e]).label);
        } else {
          setValue(e, dataPayment[e]);
        }
      })
    }
  }, [dataPayment]);

  const handleLoadImgEvidence = async () => {
    if (!dataEvidencia) return;
    const response = await axios.get(`/api/pagos/image/${dataEvidencia}`, { responseType: "arraybuffer" });
    const binaryString = Array.from(new Uint8Array(response.data), v => String.fromCharCode(v)).join("");
    const theImage = btoa(binaryString);
    setImgEvidence(theImage);
  };

  const handleOpenImage = () => {
    const image = new Image();
    image.src = `data:image/${extension};base64,${imgEvidence}`;
    const w = window.open("");
    w.document.write(image.outerHTML);
  };

  useEffect(() => {
    setImgEvidence('');
    handleLoadImgEvidence();
  }, [dataPayment])

  return (
    <Paper>
      <Grid container styles="header__container">
        <Grid item xs={12} styles="header">
          <Text variant="h3">Validación</Text>
        </Grid>
        <Grid item xs={7} md={6} styles="subtitle">
          <Text variant="h4">Datos del pago</Text>
        </Grid>
        <Grid container item xs={5} md={6} styles="subtitle" justify="flex-end">
          {estado && (
            <Chip
              label={globals.ESTADO_PAGO.find((e) => e.value === estado).label}
              color="primary"
              variant="outlined"
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
      <Grid container>
        <Grid container item xs={12} md={7} styles="container">
          <Grid item xs={12}>
            <FormControl variant="filled">
              <InputLabel htmlFor="fechaPago">Fecha de pago</InputLabel>
              <Controller
                readOnly
                as={FilledInput}
                defaultValue=""
                id="fechaPago"
                control={control}
                name="fechaPago"
                autoComplete='off'
                placeholder="Fecha de Pago"
                startAdornment={(
                  <InputAdornment position="start">
                    <CalendarTodayIcon />
                  </InputAdornment>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="filled">
              <InputLabel htmlFor="total">Importe pagado</InputLabel>
              <Controller
                readOnly
                name="total"
                control={control}
                defaultValue=""
                as={(
                  <FilledInput
                    type="number"
                    autoComplete='off'
                    id="total"
                    placeholder="total"
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
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="filled">
              <InputLabel htmlFor="medio">Medio de pago</InputLabel>
              <Controller
                readOnly
                as={FilledInput}
                defaultValue=""
                id="medio"
                control={control}
                name="medio"
                autoComplete='off'
                placeholder="Medio"
                startAdornment={(
                  <InputAdornment position="start">
                    <AccountBalanceWalletIcon />
                  </InputAdornment>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="filled">
              <InputLabel htmlFor="referencia">
                Referencia
              </InputLabel>
              <Controller
                readOnly
                as={FilledInput}
                control={control}
                id="referencia"
                name="referencia"
                autoComplete='off'
                placeholder="Número de referencia"
                startAdornment={(
                  <InputAdornment position="start">
                    <ConfirmationNumberIcon />
                  </InputAdornment>
                )}
              />
            </FormControl>
          </Grid>
          {comentario && (
            <Grid item xs={12}>
              <FormControl variant="filled">
                <InputLabel htmlFor="comentario">
                  Comentario
                </InputLabel>
                <Controller
                  readOnly
                  as={FilledInput}
                  control={control}
                  id="comentario"
                  name="comentario"
                  autoComplete='off'
                  placeholder=""
                  startAdornment={(
                    <InputAdornment position="start">
                      <CommentIcon />
                    </InputAdornment>
                  )}
                />
              </FormControl>
            </Grid>
          )}
        </Grid>
        <Grid container item xs={12} md={5} styles="containerImg">
          {!imgEvidence ? (
            <CircularProgress size={35} />
          ) : (
            <>
              <img src={`data:image/${extension};base64,${imgEvidence}`} alt="evidencia" />
              <Grid container justify="flex-end">
                <Text variant="h5" onClick={handleOpenImage}>Ver Imagen</Text>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      <Divider />
      <Grid container styles="containerButtom" justify="flex-end" spacing={0}>
        {estado === 'C' ? (
          <>
            <Grid item xs={6} md={3}>
              <Button
                fullWidth
                size="large"
                type="button"
                variant="contained"
                color="primary"
                onClick={() => handleValidateModal({ isOpen: true, data: { type: 0, idPago } })}
              >
                Rechazar
              </Button>
            </Grid>
            <Grid item xs={6} md={3}>
              <Button
                fullWidth
                size="large"
                type="button"
                variant="contained"
                color="secondary"
                onClick={() => handleValidateModal({ isOpen: true, data: { type: 1, idPago } })}
              >
                Confirmar
              </Button>
            </Grid>
          </>
        ) : (
          <Grid item xs={3}>
            <Button
              fullWidth
              size="large"
              type="button"
              variant="contained"
              color="secondary"
              onClick={onClose}
            >
              Ok
            </Button>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default ModalDetailPayment;
