import * as yup from "yup";
import useYupValidationResolver, { setLocaleYup } from "utils/yup";

setLocaleYup();

const validationSchema = yup.object({
	description: yup.string().required(),
	isTutor: yup.boolean().default(false),
});

const validation = useYupValidationResolver(validationSchema);

export default validation;
