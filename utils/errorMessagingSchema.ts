import * as Yup from "yup";

export const displayingErrorMessagesSchema = Yup.object().shape({
  experimentName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  experimentSuccess: Yup.string().required("Required"),
  categoryRadios: Yup.string().required("Required"),
  durationRadios: Yup.string().required("Required"),
});
