import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FieldArray,
  FastField,
} from "formik";
import React from "react";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [""],
};

const onSubmit = async (values, onSubmitProps) => {
  console.log("Form Submitted! = ", values);
  console.log("onSubmit Props = ", onSubmitProps);
  // enabled submit button after api response in real world
  // FAKE delay 5 seconds
  await new Promise((resolve) => setTimeout(resolve, 5000));
  onSubmitProps.setSubmitting(false);
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email!").required("Required!"),
  channel: Yup.string().required("Required!"),
});

const validateComment = (value) => {
  let error;
  if (!value) {
    error = "Please provide your comment.";
  }
  return error;
};

function YoutubeForm() {
  console.log("YoutubeForm Re-render");

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      // DESC : Formik not run the validation function onChange event  (by default true)
      // validateOnChange={false}
      // DESC : Formik not run the validation function onBlur event  (by default true)
      // validateOnBlur={false}
      // DESC : Formik run the validation function on page load event (by default false)
      // validateOnMount
    >
      {(formik) => {
        console.log("Formik props = ", formik);

        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Enter name"
              />
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
                validate={validateComment}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>

            {/* POINT : Render prop pattern */}
            <div className="form-control">
              <label htmlFor="address">Address</label>
              <FastField name="address">
                {(props) => {
                  const { field, form, meta } = props;
                  console.log("Render props = ", props);
                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
            </div>

            <div className="form-control">
              <label htmlFor="facebook">Facebook Profile</label>
              <Field type="text" id="facebook" name="social.facebook" />
            </div>

            <div className="form-control">
              <label htmlFor="twitter">Twitter Profile</label>
              <Field type="text" id="twitter" name="social.twitter" />
            </div>

            <div className="form-control">
              <label htmlFor="primaryph">Primary phone number</label>
              <Field type="text" id="primaryph" name="phoneNumbers[0]" />
            </div>

            <div className="form-control">
              <label htmlFor="secondaryph">Secondary phone number</label>
              <Field type="text" id="secondaryph" name="phoneNumbers[1]" />
            </div>

            <div className="form-control">
              <label htmlFor="phNumbers">List of phone numbers</label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  {
                    /* console.log("Field array render", fieldArrayProps); */
                  }
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { phNumbers } = values;
                  {
                    /* console.log("form errors = ", form.errors); */
                  }
                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} />
                          {index > 0 && (
                            <button type="button" onClick={() => remove(index)}>
                              {" "}
                              -{" "}
                            </button>
                          )}
                          <button type="button" onClick={() => push("")}>
                            {" "}
                            +{" "}
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>

            {/* <button type="submit">Submit</button> */}
            {/* DESC : Scenario 1 :
                - on page load button is not disabled because isValid is true (erors object is empty)
                - after clicked on submit button error message display on UI. and then Submit button disabled.
            */}
            {/* DESC : If client want button must be disabled on page load then you must do following
                  - 
             */}
            {/* <button type="submit" disabled={!formik.isValid}>
              Submit
            </button> */}
            {/* DESC : Disable button when form is submitting or when validation error occurs */}
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>

            <br />
            {/* DESC : When we clicked on this 2 below buttons errors object are field with error but touched 
                       Object is empty. Hence, error message is not display because the field must be touched (touched object is empty)
                       PROBLEM : (1)
                        */}
            <button
              type="button"
              onClick={() => formik.validateField("comments")}
            >
              Validate Comments
            </button>
            <button type="button" onClick={() => formik.validateForm()}>
              Validate All
            </button>
            <br />
            {/* DESC : When we clicked on this 2 below buttons error message display on UI. touched object is filled.App
                       - setFieldTouhced : for particular field
                       - setTouhced : for multiple fields
                       SOLUTION : (1)
             */}
            <button
              type="button"
              onClick={() => formik.setFieldTouched("comments")}
            >
              Visit Comments
            </button>
            <button
              type="button"
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  comments: true,
                  channel: true,
                })
              }
            >
              Visit All Fields
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default YoutubeForm;
