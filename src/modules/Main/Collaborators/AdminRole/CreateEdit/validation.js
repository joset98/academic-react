import * as yup from "yup";
import useYupValidationResolver, { setLocaleYup } from "utils/yup";

setLocaleYup();

const validationSchema = yup.object({
	nombres: yup.string().required(),
	apellidos: yup.string().required(),
	email: yup.string().email().required(),
	telefono: yup.string().required(),
	chargeCode: yup.string().required(),
	tipoDocumento: yup.string().required(),
	numeroDocumento: yup.string().required(),
	fechaNacimiento: yup.string().required(),
	sexo: yup.string().required(),
	address: yup.string().required(),
	departmentCode: yup.string().required(),
	codigoProvincia: yup.string().required(),
	districtCode: yup.string().required(),
	telefono: yup.string().required(),
	// colegioProcedencia: yup.string().required(),
});

const validation = useYupValidationResolver(validationSchema);

export default validation;
