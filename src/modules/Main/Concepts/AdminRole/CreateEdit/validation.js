import * as yup from "yup";
import useYupValidationResolver, { setLocaleYup } from "utils/yup";

setLocaleYup();

const validationSchema = yup.object({
	descripcion: 	yup.string().required(),
	moneda: 		yup.string().required(),
	frecuencia: 	yup.string().required(),
	diaPago: 		yup.string().required(),
	cantidadPagos: 	yup.number().required().positive().integer(),
	importe: 		yup.number().required().positive().integer(),
	porcentajeMora: yup.number().required().positive().integer(),
	penalidad: 		yup.number().required().positive().integer(),
});

const validation = useYupValidationResolver(validationSchema);

export default validation;
