import * as yup from "yup";
import useYupValidationResolver, { setLocaleYup } from "utils/yup";

setLocaleYup();

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

const validation = useYupValidationResolver(validationSchema);

export default validation;
