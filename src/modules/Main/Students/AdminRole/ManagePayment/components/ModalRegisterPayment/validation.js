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

const FILE_SIZE = 160 * 1024;

const validationSchema = yup.object({
  importePendiente: yup.string(),
  importe: yup.string().required(),
  medio: yup.string().required(),
  referencia: yup.string().required(),
  evidencia: yup.mixed().required().test(
    "fileSize",
    "Evidencia requerida",
    value => value && value[0] && value[0].name
  )
});

const validation = useYupValidationResolver(validationSchema);

export default validation;
