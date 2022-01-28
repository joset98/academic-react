import * as yup from "yup";
import useYupValidationResolver, { setLocaleYup } from "utils/yup";

setLocaleYup();

const validationSchema = yup.object({
	descripcion: 	yup.string().required(),
	tipo: 			yup.string().required(),
	idTipo: 		yup.number().required().positive().integer(),
	// conceptos: 		yup.array().required().ensure().cast(null),
});

const validation = useYupValidationResolver(validationSchema);

export default validation;
