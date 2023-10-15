import * as yup from "yup";
import { setLocaleYup } from "utils/yup";

setLocaleYup();

const validationSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});


export default validationSchema;
