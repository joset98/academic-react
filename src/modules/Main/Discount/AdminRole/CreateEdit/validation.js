import * as yup from "yup";
import useYupValidationResolver, { setLocaleYup } from "utils/yup";

setLocaleYup();

const validationSchema = yup.object({
	descripcion: 	yup.string().required(),
	tipoDescuento: 	yup.string().required(),
	valorDescuento: yup.number().required().positive().integer(),
});

const validation = useYupValidationResolver(validationSchema);

export default validation;
