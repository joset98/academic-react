import React, { useContext, useEffect, useState } from "react";
import {
    Button,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Switch,
    CircularProgress,
    Divider,
    FilledInput,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { format } from 'date-fns';
import { KeyboardDatePicker } from "@material-ui/pickers";
import WcOutlinedIcon from "@material-ui/icons/WcOutlined";
import ConfirmationNumberOutlinedIcon from "@material-ui/icons/ConfirmationNumberOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

// import { Divider, IconButton, Paper, Tooltip } from "@material-ui/core";

import useFetch from "services/useFetch";
import Text from "components/Text";
import { SnackbarDispatchContext } from "providers/Snackbar/provider";
import { SNACKBAR_SHOW } from "providers/Snackbar/actions";
import validation from "../../../Concepts/AdminRole/CreateEdit/validation";
import { Grid, FormControl } from "../CreateEdit/styles";
import globals from "utils/globals";
// const CreateForm = () => {}

const CreateConceptDialog = ({
    isOpen,
    handleOpen,
    handleClickClose,
    callbackFetch
}) => {


    const {
        handleSubmit,
        control,
        errors,
        watch,
        reset,
        setValue,
        getValues } = useForm({ resolver: validation });

    const dispatch = useContext(SnackbarDispatchContext);

    const { fetch: submit, loading: loadingSubmit } = useFetch({ uri: "/api/conceptos" });

    const onSubmit = async (data) => {
        const { diaPago } = data;
        const formatDate = format(new Date(diaPago), 'yyyy-MM-dd');
        // console.log(data)

        if (!loadingSubmit) {
            // console.log(data)

            const response = await submit({ ...data, diaPago: formatDate }, {
                method: "post",
            });

            if (response.status === 201 || response.status === 200) {
                dispatch({
                    type: SNACKBAR_SHOW,
                    payload: {
                        severity: "success",
                        message: "Concepto registrado correctamente",
                    },
                });
            }
            callbackFetch();
            handleClickClose();
        }

    };


    return (

        <>
            <Dialog
                fullWidth={true}
                maxWidth="lg"
                open={isOpen}
                onClose={handleClickClose}
                scroll='paper'
            >
                <DialogTitle>Nuevo Concepto</DialogTitle>

                <DialogContent dividers>



                    <form onSubmit={handleSubmit(onSubmit)}>

                        <Paper>

                            <Grid container>
                                <Grid item xs={12} styles="header">
                                    <Text>Crear Concepto</Text>
                                </Grid>
                            </Grid>

                            <Grid container styles="container" spacing={2}>

                                <Grid item xs={12} md={6}>
                                    <FormControl variant="filled">
                                        <InputLabel htmlFor="descripcion">Descripcion</InputLabel>

                                        <Controller
                                            as={FilledInput}
                                            id="descripcion"
                                            name="descripcion"
                                            defaultValue=""
                                            control={control}
                                            autoComplete='off'
                                            error={errors.descripcion}
                                            placeholder="Descripcion"
                                            startAdornment={(
                                                <InputAdornment position="start">
                                                    <PersonOutlineOutlinedIcon />
                                                </InputAdornment>
                                            )}
                                        />
                                        {errors.descripcion && (
                                            <FormHelperText error>{errors.descripcion.message}</FormHelperText>
                                        )}
                                    </FormControl>

                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <FormControl variant="filled">
                                        <InputLabel htmlFor="importe">Importe</InputLabel>
                                        <Controller
                                            as={FilledInput}
                                            id="importe"
                                            name="importe"
                                            type="number"
                                            defaultValue=""
                                            control={control}
                                            autoComplete='off'
                                            placeholder="Importe"
                                            error={errors.importe}
                                            startAdornment={(
                                                <InputAdornment position="start">
                                                    <ConfirmationNumberOutlinedIcon />
                                                </InputAdornment>
                                            )}
                                        />
                                        {errors.importe && (
                                            <FormHelperText error>{errors.importe.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <FormControl variant="filled">
                                        <InputLabel htmlFor="moneda">Moneda</InputLabel>
                                        <Controller
                                            as={(
                                                <Select>
                                                    {globals.MONEDA.map((money) => (
                                                        <MenuItem key={money.value} value={money.value}>
                                                            {money.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            )}
                                            id="moneda"
                                            name="moneda"
                                            defaultValue=""
                                            placeholder="Moneda"
                                            control={control}
                                            error={errors.moneda}
                                            startAdornment={(
                                                <InputAdornment position="start">
                                                    <WcOutlinedIcon />
                                                </InputAdornment>
                                            )}
                                        />
                                        {errors.moneda && (
                                            <FormHelperText error>{errors.moneda.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <FormControl variant="filled">
                                        <InputLabel htmlFor="cantidadPagos">Cantidad de Pagos</InputLabel>
                                        <Controller
                                            as={FilledInput}
                                            id="cantidadPagos"
                                            name="cantidadPagos"
                                            type="number"
                                            defaultValue=""
                                            control={control}
                                            autoComplete='off'
                                            placeholder="Cantidad de Pagos"
                                            error={errors.cantidadPagos}
                                            startAdornment={(
                                                <InputAdornment position="start">
                                                    <ConfirmationNumberOutlinedIcon />
                                                </InputAdornment>
                                            )}
                                        />
                                        {errors.cantidadPagos && (
                                            <FormHelperText error>{errors.cantidadPagos.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <FormControl variant="filled">
                                        <InputLabel htmlFor="frecuencia">Frecuencia</InputLabel>
                                        <Controller
                                            as={(
                                                <Select>
                                                    {globals.FRECUENCIA.map((frecuency) => (
                                                        <MenuItem key={frecuency.value} value={frecuency.value}>
                                                            {frecuency.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            )}
                                            id="frecuencia"
                                            name="frecuencia"
                                            defaultValue=""
                                            placeholder="Frecuencia"
                                            control={control}
                                            error={errors.frecuencia}
                                            startAdornment={(
                                                <InputAdornment position="start">
                                                    <WcOutlinedIcon />
                                                </InputAdornment>
                                            )}
                                        />
                                        {errors.frecuencia && (
                                            <FormHelperText error>{errors.frecuencia.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <FormControl variant="filled">
                                        <Controller
                                            control={control}
                                            name="diaPago"
                                            id="diaPago"
                                            initialFocusedDate={null}
                                            defaultValue={null}
                                            as={(
                                                <KeyboardDatePicker
                                                    variant="inline"
                                                    autoOk
                                                    format="dd/MM/yyyy"
                                                    inputVariant="filled"
                                                    minDate={new Date()}
                                                    label="Día de Pago"
                                                    autoComplete='off'
                                                    views={["year", "month", "date"]}
                                                    invalidDateMessage="Fecha inválida"
                                                    error={errors.diaPago}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            )}
                                            error={errors.diaPago}
                                        />
                                        {errors.diaPago && (
                                            <FormHelperText error>
                                                {errors.diaPago.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <FormControl variant="filled">
                                        <InputLabel htmlFor="porcentajeMora">Porcentaje de Mora</InputLabel>
                                        <Controller
                                            as={FilledInput}
                                            id="porcentajeMora"
                                            name="porcentajeMora"
                                            type="number"
                                            defaultValue=""
                                            control={control}
                                            autoComplete='off'
                                            placeholder="Porcentaje de Mora"
                                            error={errors.porcentajeMora}
                                            startAdornment={(
                                                <InputAdornment position="start">
                                                    <ConfirmationNumberOutlinedIcon />
                                                </InputAdornment>
                                            )}
                                        />
                                        {errors.porcentajeMora && (
                                            <FormHelperText error>{errors.porcentajeMora.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <FormControl variant="filled">
                                        <InputLabel htmlFor="penalidad">Penalidad</InputLabel>
                                        <Controller
                                            as={FilledInput}
                                            id="penalidad"
                                            name="penalidad"
                                            type="number"
                                            defaultValue=""
                                            control={control}
                                            autoComplete='off'
                                            placeholder="Penalidad"
                                            error={errors.penalidad}
                                            startAdornment={(
                                                <InputAdornment position="start">
                                                    <ConfirmationNumberOutlinedIcon />
                                                </InputAdornment>
                                            )}
                                        />
                                        {errors.penalidad && (
                                            <FormHelperText error>{errors.penalidad.message}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>

                            </Grid>

                            <Divider />

                            <Grid container styles="container" justify="flex-end" spacing={2}>

                                <Grid item xs={4} md={3} lg={2}>
                                    <Button size="large" fullWidth onClick={() => history.goBack()}>
                                        Cancelar
                                    </Button>
                                </Grid>

                                <Grid item xs={4} md={3} lg={2}>
                                    <Button
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        {loadingSubmit ? <CircularProgress size={24} /> : (
                                            <>
                                                Crear
                                            </>
                                        )}
                                    </Button>
                                </Grid>

                            </Grid>
                        </Paper>
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClickClose}>Close</Button>
                </DialogActions>

            </Dialog>
        </>
    );
}

export default CreateConceptDialog;
