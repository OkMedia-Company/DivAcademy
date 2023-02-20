import * as yup from "yup";
const validationSchema = yup.object().shape({
  id_number: yup
    .string()
    .matches(
      /^[a-zA-Z0-9]{7}$/,
      "Şəxsiyyət vəsiqəsi nömrəsi 7 rəqəmli yalnız hərflərdən və rəqəmlərdən ibarət olmalıdır"
    )
    .required("ID Number is required"),
  email: yup.string().email("Düzgün email daxil edin"),
  edu_email: yup.string().email("Düzgün email daxil edin"),
  phone_number: yup
    .string()
    .matches(
      /^\+994\d{9}$/,
      "Phone number must start with +994 and have 9 digits after it"
    )
    .required("Phone number is required"),
  fin: yup
    .string("FIN yalniz herfden")
    .min(7, "FIN yalnız 7 rəqəmdən ibarət olmalıdır")
    .max(7, "FIN yalnız 7 rəqəmdən ibarət olmalıdır"),
});

export default validationSchema;
