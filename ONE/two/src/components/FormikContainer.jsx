import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const initialValues = {};
const validationSchema = Yup.object({});
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
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormikContainer;
