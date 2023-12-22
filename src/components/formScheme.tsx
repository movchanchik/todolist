import * as Yup from "yup";
import { checkUniq } from "../utils/utils";

export const AddSchema = Yup.object().shape({
  todo: Yup.string()
    .min(
      3,
      "The entered value is too short. Please provide a minimum of 3 characters."
    )
    .max(
      80,
      "The entered value is too long. Please limit your input to a maximum of 80 characters."
    )
    .required("The following field is required and cannot be left blank.")
    .test("Unique", "Values need te be unique", (value) => {
      return value ? checkUniq(value) : false;
    }),
});

export const UpdateSchema = Yup.object().shape({
  todo: Yup.string()
    .min(
      3,
      "The entered value is too short. Please provide a minimum of 3 characters."
    )
    .max(
      80,
      "The entered value is too long. Please limit your input to a maximum of 80 characters."
    )
    .required("The following field is required and cannot be left blank."),
});
