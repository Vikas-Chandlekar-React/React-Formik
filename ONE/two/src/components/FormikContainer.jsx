import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required("Required!"),
});

const onSubmit = (values) => {
  console.log("Form Submitted");
  console.log("Form Data = ", values);
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
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormikContainer;
