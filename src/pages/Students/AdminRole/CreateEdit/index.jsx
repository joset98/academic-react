import React, { useContext, useEffect, useState } from "react";

import {
  Button, CircularProgress, Divider, FilledInput,
  FormHelperText, InputAdornment, InputLabel, MenuItem, Paper, Select,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import {
  CreditCardOutlined, LocationCity, LocationCityOutlined,
  LocationOnOutlined, MailOutline, PhoneOutlined,
} from "@mui/icons-material";
import { format } from 'date-fns';
import { KeyboardDatePicker } from "@material-ui/pickers";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";

import NavigationSection from "layouts/NavigationSection";
import Text from "components/Text";
import useFetch from "services/useFetch";
import globals from "utils/globals";
import { SnackbarDispatchContext } from "providers/Snackbar/provider";
import { SNACKBAR_SHOW } from "providers/Snackbar/actions";
import { SET_A_PAGE_WITH_INDEX } from "providers/NavegationLevel/actions";
import { NavegationLevelDispatchContext } from "providers/NavegationLevel/provider";
import validation from "./validation";
import { Grid, FormControl } from "./styles";

const CreateEdit = ({ history, match }) => {
  const { handleSubmit, control, errors, watch, reset, setValue, getValues } = useForm({ resolver: validation });
  const dispatch = useContext(SnackbarDispatchContext);
  const [user, setUser] = useState({});
  const [studentId, setStatudentId] = useState(match.params.id);
  const [departaments, setDepartaments] = useState([]);
  const [provincies, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const { codigoDepartamento, codigoProvincia } = watch();
  const { fetch: submit, loading: loadingSubmit } = useFetch({ uri: "/api/estudiantes" });
  const { fetch: fetchStudent, loading: loadingStatudent } = useFetch({ loading: !!studentId });
  const { fetch: fetchDepartamentos, loading: loadingDepartaments } = useFetch({ uri: "/api/ubigeos/departamentos" });
  const { fetch: fetchProvincias, loading: loadingProvincias } = useFetch({});
  const { fetch: fetchDistritos, loading: loadingDistrito } = useFetch({});
  const dispatchNavegation = useContext(NavegationLevelDispatchContext);

  useEffect(() => {
    const navegations = [];
    if (studentId && user.nombres) {
      const { nombres, apellidos } = user;
      navegations.push(
        {
          index: '1',
          title: (`${nombres.split(' ')[0]} ${apellidos.split(' ')[0]}`).toLowerCase(),
        }
      );
    };

    setTimeout(() => {
      dispatchNavegation({
        type: SET_A_PAGE_WITH_INDEX,
        payload: {
          title: studentId ? "Editar estudiante" : "Crear estudiante",
          pages: navegations,
        }
      });
    }, 100);
  }, [user]);

  const onSubmit = async (data) => {
    const { fechaNacimiento } = data;
    const formatDate = format(new Date(fechaNacimiento), 'yyyy-MM-dd');
    if (!loadingSubmit) {
      const response = await submit({ ...data, fechaNacimiento: formatDate }, {
        method: "post",
      });

      if (response.status === 201 || response.status === 200) {
        dispatch({
          type: SNACKBAR_SHOW,
          payload: {
            severity: "success",
            message: "Estudiante registrado correctamente",
          },
        });
        history.push("/p/estudiantes");
      }
    }
  };

  const loadDataStudent = async () => {
    const response = await fetchStudent({}, { url: `/api/estudiantes/${studentId}` })
    if (response.status === 200) {
      setUser(response.data);
      reset(response.data);
    }
  }

  const loadDepartaments = async () => {
    const response = await fetchDepartamentos({});
    if (response.status === 200) {
      setDepartaments(
        response.data.map((e) => ({
          value: e.codigoDepartamento,
          label: e.descripcion,
        }))
      );
    }
  };

  const loadProvinces = async () => {
    const response = await fetchProvincias(
      {},
      {
        url: `/api/ubigeos/departamentos/${codigoDepartamento}/provincias`,
      }
    );
    if (response && response.status === 200) {
      setProvinces(
        response.data.map((e) => ({
          value: e.codigoProvincia,
          label: e.descripcion,
        }))
      );
    }
  };

  const loadDistricts = async () => {
    const response = await fetchDistritos(
      {},
      {
        url: `/api/ubigeos/departamentos/${codigoDepartamento}/provincias/${codigoProvincia}/distritos`,
      }
    );
    if (response && response.status === 200) {
      setDistricts(
        response.data.map((e) => ({
          value: e.codigoDistrito,
          label: e.descripcion,
        }))
      );
    }
  };

  useEffect(() => {
    loadDepartaments();
  }, []);

  useEffect(() => {
    if (codigoDepartamento && codigoDepartamento !== "") loadProvinces();
  }, [codigoDepartamento]);

  useEffect(() => {
    if (codigoProvincia && codigoProvincia !== "") loadDistricts();
  }, [codigoProvincia]);

  useEffect(() => {

    if (studentId) {
      loadDataStudent();
    }
    
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper>
        <Grid container>
          <Grid item xs={12} styles="header">
            <Text>{studentId ? "Editar estudiante" : "Crear estudiante"}</Text>
          </Grid>
        </Grid>
        <Grid container styles="container" spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl variant="filled">
              <InputLabel htmlFor="nombres">Nombres</InputLabel>
              <Controller
                as={FilledInput}
                id="nombres"
                name="nombres"
                defaultValue=""
                control={control}
                autoComplete='off'
                error={errors.nombres}
                placeholder="Nombres"
                startAdornment={(
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon />
                  </InputAdornment>
                )}
              />
              {errors.nombres && (
                <FormHelperText error>{errors.nombres.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl variant="filled">
              <InputLabel htmlFor="apellidos">Apellidos</InputLabel>
              <Controller
                as={FilledInput}
                id="apellidos"
                defaultValue=""
                control={control}
                name="apellidos"
                autoComplete='off'
                placeholder="Apellidos"
                error={errors.apellidos}
                startAdornment={(
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon />
                  </InputAdornment>
                )}
              />
              {errors.apellidos && (
                <FormHelperText error>
                  {errors.apellidos.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="filled">
              <InputLabel htmlFor="codigo">Código</InputLabel>
              <Controller
                as={FilledInput}
                id="codigo"
                name="codigo"
                type="number"
                defaultValue=""
                control={control}
                autoComplete='off'
                placeholder="Código"
                error={errors.codigo}
                rules={{ required: true, maxLength: 13 }}
                startAdornment={(
                  <InputAdornment position="start">
                    <ConfirmationNumberOutlinedIcon />
                  </InputAdornment>
                )}
              />
              {errors.codigo && (
                <FormHelperText error>{errors.codigo.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="filled">
              <InputLabel htmlFor="tipoDocumento">Tipo de documento</InputLabel>
              <Controller
                as={Select}
                defaultValue=""
                id="tipoDocumento"
                control={control}
                name="tipoDocumento"
                autoComplete='off'
                placeholder="Tipo de documento"
                error={errors.tipoDocumento}
                startAdornment={(
                  <InputAdornment position="start">
                    <CreditCardOutlined />
                  </InputAdornment>
                )}
              >
                {globals.TIPO_DOCUMENTOS.map((e) => (
                  <MenuItem value={e.value}>{e.label}</MenuItem>
                ))}
              </Controller>
              {errors.tipoDocumento && (
                <FormHelperText error>
                  {errors.tipoDocumento.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="filled">
              <InputLabel htmlFor="numeroDocumento">
                Número documento
              </InputLabel>
              <Controller
                as={FilledInput}
                control={control}
                id="numeroDocumento"
                name="numeroDocumento"
                autoComplete='off'
                placeholder="Número documento"
                error={errors.numeroDocumento}
                startAdornment={(
                  <InputAdornment position="start">
                    <CreditCardOutlined />
                  </InputAdornment>
                )}
              />
              {errors.numeroDocumento && (
                <FormHelperText error>
                  {errors.numeroDocumento.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl variant="filled">
              <Controller
                control={control}
                name="fechaNacimiento"
                id="fechaNacimiento"
                initialFocusedDate={null}
                defaultValue={null}
                as={(
                  <KeyboardDatePicker
                    variant="inline"
                    autoOk
                    defaultValue=""
                    format="dd/MM/yyyy"
                    inputVariant="filled"
                    maxDate={new Date()}
                    label="Fecha de Nacimiento"
                    autoComplete='off'
                    views={["year", "month", "date"]}
                    invalidDateMessage="Fecha inválida"
                    error={errors.fechaNacimiento}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
                error={errors.fechaNacimiento}
              />
              {errors.fechaNacimiento && (
                <FormHelperText error>
                  {errors.fechaNacimiento.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl variant="filled">
              <InputLabel htmlFor="sexo">Sexo</InputLabel>
              <Controller
                as={(
                  <Select>
                    {globals.SEXO.map((e) => (
                      <MenuItem key={e.value} value={e.value}>
                        {e.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                id="sexo"
                name="sexo"
                defaultValue=""
                placeholder="Sexo"
                control={control}
                error={errors.sexo}
                startAdornment={(
                  <InputAdornment position="start">
                    <WcOutlinedIcon />
                  </InputAdornment>
                )}
              />
              {errors.sexo && (
                <FormHelperText error>{errors.sexo.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl variant="filled">
              <InputLabel htmlFor="email">Email</InputLabel>
              <Controller
                as={FilledInput}
                id="email"
                name="email"
                defaultValue=""
                control={control}
                autoComplete='off'
                placeholder="Email"
                error={errors.email}
                startAdornment={(
                  <InputAdornment position="start">
                    <MailOutline />
                  </InputAdornment>
                )}
              />
              {errors.email && (
                <FormHelperText error>{errors.email.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl variant="filled">
              <InputLabel htmlFor="telefono">Télefono</InputLabel>
              <Controller
                as={FilledInput}
                id="telefono"
                type="number"
                defaultValue=""
                name="telefono"
                autoComplete='off'
                control={control}
                error={errors.email}
                placeholder="Teléfono"
                startAdornment={(
                  <InputAdornment position="start">
                    <PhoneOutlined />
                  </InputAdornment>
                )}
              />
              {errors.telefono && (
                <FormHelperText error>{errors.telefono.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="filled">
              <InputLabel htmlFor="codigoDepartamento">Departamento</InputLabel>
              <Controller
                as={(
                  <Select>
                    {departaments.map((e) => (
                      <MenuItem key={e.value} value={e.value}>
                        {e.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                defaultValue=""
                control={control}
                id="codigoDepartamento"
                name="codigoDepartamento"
                placeholder="Departamento"
                disabled={loadingDepartaments}
                error={errors.codigoDepartamento}
                startAdornment={(
                  <InputAdornment position="start">
                    <LocationCity />
                  </InputAdornment>
                )}
              />
              {errors.codigoDepartamento && (
                <FormHelperText error>
                  {errors.codigoDepartamento.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="filled">
              <InputLabel htmlFor="provincia">Provincia</InputLabel>
              <Controller
                as={(
                  <Select>
                    {provincies.map((e) => (
                      <MenuItem key={e.value} value={e.value}>
                        {e.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                defaultValue=""
                control={control}
                id="codigoProvincia"
                name="codigoProvincia"
                placeholder="Provincia"
                disabled={codigoDepartamento === "" || loadingProvincias}
                error={errors.codigoProvincia}
                startAdornment={(
                  <InputAdornment position="start">
                    <LocationCity />
                  </InputAdornment>
                )}
              />

              {errors.codigoProvincia && (
                <FormHelperText error>
                  {errors.codigoProvincia.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="filled">
              <InputLabel htmlFor="codigoDistrito">Distrito</InputLabel>
              <Controller
                as={(
                  <Select>
                    {districts.map((e) => (
                      <MenuItem key={e.value} value={e.value}>
                        {e.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                control={control}
                defaultValue=""
                id="codigoDistrito"
                name="codigoDistrito"
                placeholder="Distrito"
                error={errors.codigoDistrito}
                disabled={codigoProvincia === "" || loadingDistrito}
                startAdornment={(
                  <InputAdornment position="start">
                    <LocationCity />
                  </InputAdornment>
                )}
              />
              {errors.codigoDistrito && (
                <FormHelperText error>
                  {errors.codigoDistrito.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="filled">
              <InputLabel htmlFor="direccion">Dirección</InputLabel>
              <Controller
                as={FilledInput}
                id="direccion"
                defaultValue=""
                name="direccion"
                control={control}
                autoComplete='off'
                placeholder="Dirección"
                error={errors.direccion}
                startAdornment={(
                  <InputAdornment position="start">
                    <LocationOnOutlined />
                  </InputAdornment>
                )}
              />
              {errors.direccion && (
                <FormHelperText error>
                  {errors.direccion.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="filled">
              <InputLabel htmlFor="colegioProcedencia">
                Colegio de procedencia
              </InputLabel>
              <Controller
                as={FilledInput}
                defaultValue=""
                control={control}
                autoComplete='off'
                id="colegioProcedencia"
                name="colegioProcedencia"
                placeholder="Colegio de procedencia"
                error={errors.colegioProcedencia}
                startAdornment={(
                  <InputAdornment position="start">
                    <LocationCityOutlined />
                  </InputAdornment>
                )}
              />
              {errors.colegioProcedencia && (
                <FormHelperText error>
                  {errors.colegioProcedencia.message}
                </FormHelperText>
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
              {loadingSubmit || loadingStatudent ? <CircularProgress size={24} /> : (
                <>
                  {studentId ? 'Editar' : 'Crear'}
                </>
              )}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default NavigationSection({
  title: "Estudiantes",
  pages: [
    {
      path: "/p/estudiantes",
      title: "Estudiantes",
    },
    {
      title: "Nuevo",
    },
  ],
})(CreateEdit);
