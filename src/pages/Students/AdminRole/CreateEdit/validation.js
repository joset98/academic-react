/* eslint-disable prettier/prettier */
/* eslint-disable import/named */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import * as yup from "yup";
import useYupValidationResolver, { setLocaleYup } from "utils/yup";

setLocaleYup();

const validationSchema = yup.object({
  nombres: yup.string().required(),
  apellidos: yup.string().required(),
  codigo: yup.string().required(),
  tipoDocumento: yup.string().required(),
  numeroDocumento: yup.string().required(),
  fechaNacimiento: yup.string().required(),
  sexo: yup.string().required(),
  email: yup.string().email().required(),
  direccion: yup.string().required(),
  codigoDepartamento: yup.string().required(),
  codigoProvincia: yup.string().required(),
  codigoDistrito: yup.string().required(),
  telefono: yup.string().required(),
  colegioProcedencia: yup.string().required(),
});

const validation = useYupValidationResolver(validationSchema);

export default validation;
