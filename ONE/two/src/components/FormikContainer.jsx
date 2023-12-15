import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";

const dropdownOptions = [
  { key: "Select an option", value: "" },
  { key: "Option 1", value: "option1" },
  { key: "Option 2", value: "option2" },
  { key: "Option 3", value: "option 3" },
];

const radioOptions = [
  { key: "Option 1", value: "roption1" },
  { key: "Option 2", value: "roption2" },
  { key: "Option 3", value: "roption3" },
];

const checkboxOptions = [
  { key: "Option 1", value: "cOption1" },
  { key: "Option 2", value: "cOption2" },
  { key: "Option 3", value: "cOption3" },
];

const initialValues = {
  email: "",
  description: "",
  selectOption: "",
  radioOption: "",
  checkboxOption: [],
  birthDate: null,
  /** SOLUTION : Let assume, data from API or third party not passed as date as string
   *    e.g. "2023-12-14T18:30:00.000Z"
   *  if they pass as string
   *    then use parse date means (new Date(stringDate))
   */
  // birthDate: new Date("2023-12-14T18:30:00.000Z"),
};

const validationSchema = Yup.object({
  email: Yup.string().required("Required!"),
  description: Yup.string().required("Required!"),
  selectOption: Yup.string().required("Required!"),
  radioOption: Yup.string().required("Required!"),
  checkboxOption: Yup.array().min(1, "At least one option is required"),
  birthDate: Yup.date().required("Required!"),
});

const onSubmit = (values) => {
  console.log("Form Submitted");
  console.log("Form Data = ", values);
  /** DESC :
        - In above line, birthDate as Date Object
        - In below line, birthDate as String
  */
  console.log("Saved Data = ", JSON.parse(JSON.stringify(values)));
};

function FormikContainer() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="input"
              type="email"
              label="Email"
              name="email"
            />

            <FormikControl
              control="textarea"
              label="Description"
              name="description"
            />

            <FormikControl
              control="select"
              label="Select a topic"
              name="selectOption"
              options={dropdownOptions}
            />

            <FormikControl
              control="radio"
              label="Radio Option"
              name="radioOption"
              options={radioOptions}
            />

            <FormikControl
              control="checkbox"
              label="Checkbox topics"
              name="checkboxOption"
              options={checkboxOptions}
            />

            <FormikControl
              control="date"
              label="Pick a date"
              name="birthDate"
            />

            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormikContainer;
