import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
};

const onSubmit = (values) => {
  console.log("Form Submitted! = ", values);
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email!").required("Required!"),
  channel: Yup.string().required("Required!"),
});

function OldYoutubeForm3() {
  console.log("YoutubeForm Re-render");

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Field type="text" id="name" name="name" placeholder="Enter name" />
          {/* TOPIC : 1st way to display error message */}
          {/* POINT : It display only error message without any div */}
          {/* <ErrorMessage name="name" /> */}
          {/* POINT : It display only error message wrap inside div */}
          {/* <ErrorMessage name="name" component={"div"} /> */}
          {/* POINT : It display only error message wrap inside custom Component */}
          <ErrorMessage name="name" component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <Field
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
          />
          {/* <ErrorMessage name="email" /> */}

          {/* TOPIC : 2nd way to display error message using Render props pattern */}
          <ErrorMessage name="email">
            {(errorMsg) => {
              return <div className="error">{errorMsg}</div>;
            }}
          </ErrorMessage>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <Field
            type="text"
            id="channel"
            name="channel"
            placeholder="Enter channel"
          />
          <ErrorMessage name="channel" />
        </div>

        <div className="form-control">
          <label htmlFor="comments">Comments</label>
          {/* POINT : Add textarea you can use attribute as / component (deprecated) */}
          <Field
            as="textarea"
            id="comments"
            name="comments"
            placeholder="Enter comment"
          />
        </div>

        {/* POINT : Render prop pattern */}
        <div className="form-control">
          <label htmlFor="address">Address</label>
          <Field name="address">
            {(props) => {
              const { field, form, meta } = props;
              console.log("Render props = ", props);
              return (
                <div>
                  <input type="text" id="address" {...field} />
                  {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                </div>
              );
            }}
          </Field>
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

export default OldYoutubeForm3;
