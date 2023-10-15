import * as yup from "yup";
import useYupValidationResolver, { setLocaleYup } from "utils/yup";

setLocaleYup();

const validationSchema = yup.object({
	vacancies: yup.number().required().positive().integer(),
	ciclo: yup.string().required(),
	collaborator: yup.string().required(),
	descripcion: yup.string().required(),
});

const validation = useYupValidationResolver(validationSchema);

export default validation;
