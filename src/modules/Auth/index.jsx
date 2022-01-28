import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { withTheme } from "styled-components";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";

import {
  PermIdentity,
  Visibility,
  VisibilityOff,
  LockOutlined,
} from "@material-ui/icons";
import { Helmet } from "react-helmet";
import { useForm, Controller } from "react-hook-form";
import useFetch from "services/useFetch";
import { setCookie } from "utils/cookie";
import { AuthDispatchContext } from "providers/Auth/provider";
import { AUTH_LOGIN } from "providers/Auth/actions";
import { SnackbarDispatchContext } from "providers/Snackbar/provider";
import { SNACKBAR_SHOW } from "providers/Snackbar/actions";
import Snackbar from "shared/Snackbar";
import Container, {
  GridForm,
  GridImage,
  Overlay,
  Logo,
  Text,
  FormControl,
} from "./styles";
import validation from "./validation";

const Auth = ({ theme, history }) => {

  const dispatchSnack = useContext(SnackbarDispatchContext);
  const { fetchLogin, loading } = useFetch({
    uri: `/api/oauth/token`,
    method: "post",
  });

  const { fetch: fetchJwt, loading: loadingJwt } = useFetch({
    uri: '/token'
  });

  const { fetch: fetchUserData, loading: loadingUserData } = useFetch({
    uri: '/api/usuarios/my'
  });

  const dispatch = useContext(AuthDispatchContext);

  const {
    register,
    handleSubmit,
    control,
    errors,
    setError,
    clearErrors,
  } = useForm({
    resolver: validation,
  });

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (data) => {
    clearErrors("authServer");
    const response = await fetchLogin({
      ...data,
      grant_type: "password",
    });
    if (response.status === 200) {
      setCookie("auth", JSON.stringify(response.data));

      const responseDataUser = await fetchUserData({});

      if (responseDataUser.status === 200) {
        const responseJwt = await fetchJwt({});

        if (responseJwt.status === 200) {
          const authData = {
            ...response.data,
            ...{
              idUsuario: responseDataUser.data.idUsuario,
              lastname: responseDataUser.data.apellidos,
              name: responseDataUser.data.nombres,
              email: responseDataUser.data.email,
              documentNumber: responseDataUser.data.numeroDocumento,
              modulos: responseDataUser.data.modulos,
              menus: responseDataUser.data.menus,
              permisos: responseDataUser.data.permisos,
              role: responseJwt.data.authorities[0],
              allRoles: responseJwt.data.authorities,
            }
          };

          dispatch({ type: AUTH_LOGIN, payload: authData });
          setCookie("auth", JSON.stringify(authData));

          setTimeout(() => {
            history.push("/p");
          }, 0);
        } else {
          dispatchSnack({
            type: SNACKBAR_SHOW,
            payload: {
              severity: "error",
              message: "Error message",
            },
          });
        }

      } else {
        dispatchSnack({
          type: SNACKBAR_SHOW,
          payload: {
            severity: "error",
            message: "Error message",
          },
        });
      }

    } else {
      setError("authServer", {
        type: "string",
        message: response.data.error_description,
      });
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Autentificación</title>
      </Helmet>
      <Container>
        <GridForm>
          <Grid container justify="center">
            <Grid item xs={12} md={8} container alignItems="center" direction="column">
              <Logo
                src={`${theme.config.images}logo.png`}
                alt={`Logo ${theme.config.name}`}
              />
              <Text styles="welcome" fontFamily="secondary">
                Bienvenido!
              </Text>
              <Text styles="welcomeMsg">Ingresa tus datos para continuar.</Text>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth variant="outlined">
                  <Controller
                    as={OutlinedInput}
                    id="input-with-icon-adornment"
                    inputRef={register}
                    control={control}
                    defaultValue=""
                    name="username"
                    placeholder="Tu nombre usuario"
                    error={errors.username}
                    startAdornment={(
                      <InputAdornment position="start">
                        <PermIdentity />
                      </InputAdornment>
                    )}
                  />
                  {errors.username && (
                    <FormHelperText error>
                      {errors.username.message}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    inputRef={register}
                    control={control}
                    name="password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    placeholder="Contraseña"
                    error={errors.password}
                    onChange={handleChange("password")}
                    startAdornment={(
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    )}
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )}
                  />
                  {errors.password && (
                    <FormHelperText error>
                      {errors.password.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControlLabel
                  control={(
                    <Checkbox
                      onChange={handleChange}
                      name="checkedB"
                      color="primary"
                    />
                  )}
                  label="Recordar contraseña"
                />
                {errors.authServer && (
                  <FormHelperText error>
                    {errors.authServer.message}
                  </FormHelperText>
                )}
                <Grid container justify="center">
                  <Grid item xs={5}>
                    <Button
                      color="secondary"
                      variant="contained"
                      type="submit"
                      fullWidth
                    >
                      {" "}
                      {loading || loadingUserData || loadingJwt ? <CircularProgress size={24} /> : "Ingresar"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </GridForm>
        <GridImage>
          <Overlay />
        </GridImage>
      </Container>
      <Snackbar />
    </>
  );
};

Auth.propTypes = {
  theme: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTheme(Auth);
