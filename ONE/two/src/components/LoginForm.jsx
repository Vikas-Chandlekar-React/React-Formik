import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikControl from "./FormikControl";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required!"),
  password: Yup.string().required("Required!"),
});

const onSubmit = (values) => {
  console.log("Form submitted = ", values);
};

function LoginForm() {
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
              // control="input"
              control="chakraInput"
              type="email"
              name="email"
              label="Email"
            />

            <FormikControl
              // control="input"
              control="chakraInput"
              type="password"
              name="password"
              label="Password"
            />

            <button type="submit" disabled={!formik.isValid}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
