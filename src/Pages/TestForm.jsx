import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { BACK_END_URL } from "../URL";
import { useState } from "react";
import DeleteTextError from "../components/DeleteTextError";

function TestForm() {
  const [message, setMessage] = useState("");
  //   const formik = useFormik({
  //     initialValues: {
  //       userName: "",
  //       email: "",
  //       password: "",
  //     },
  //     validationSchema: yup.object({
  //       userName: yup
  //         .string()
  //         .min(7, "Username must be 7 character or above")
  //         .required("Username is required"),
  //       email: yup
  //         .string()
  //         .required("Emil is Required")
  //         .email("should be a vailed email"),
  //       password: yup
  //         .string()
  //         .min(7, "Password must be 7 character or above")
  //         .required("Passwored is Required"),
  //     }),
  //     onSubmit: async (values) => {
  //       console.log(values);
  //     },
  //   });

  const initialValues = {
    userName: "",
    email: "",
    password: "",
    comments: "",
    address: "",
    social: {
      facebook: "",
      twitter: "",
    },
    phoneNumber: ["", ""],
    anotherPhNumber: [""],
  };
  const validationSchema = yup.object({
    userName: yup
      .string()
      .min(7, "Username must be 7 character or above")
      .required("Username is required"),
    email: yup
      .string()
      .required("Emil is Required")
      .email("should be a vailed email"),
    password: yup
      .string()
      .min(7, "Password must be 7 character or above")
      .required("Passwored is Required"),
    comments: yup
      .string()
      .min(10, "should be at least above 10 character")
      .max(20, "comment should not be above 20 character")
      .required("comments is required"),
    address: yup.string().required("address is required"),
  });

  const formSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={formSubmit}
    >
      <Form>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Username
          </label>
          <Field
            type="text"
            className="form-control border border-black"
            id="exampleInputName"
            name="userName"
          />
          {/* {formik.touched.userName && formik.errors.userName ? (
            <div id="emailHelp" className="form-text text-danger">
              {formik.errors.userName}
            </div>
          ) : null} */}
          <ErrorMessage name="userName" component={DeleteTextError} />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <Field
            type="email"
            className="form-control border border-black"
            id="exampleInputEmail1"
            name="email"
          />
          <ErrorMessage name="email">
            {(errorMessage) => (
              <div className="text-danger">{errorMessage}</div>
            )}
          </ErrorMessage>
          {/* {formik.touched.email && formik.errors.email ? (
            <div id="emailHelp" className="form-text text-danger">
              {formik.errors.email}
            </div>
          ) : null} */}
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <Field
            type="password"
            className="form-control border border-black"
            id="exampleInputPassword1"
            name="password"
          />
          <ErrorMessage name="password" component={DeleteTextError} />
          {/* {formik.touched.password && formik.errors.password ? (
            <div id="emailHelp" className="form-text text-danger">
              {formik.errors.password}
            </div>
          ) : null} */}
        </div>

        <div className="mb-3">
          <label htmlFor="comments" className="form-lable">
            comments
          </label>
          <Field
            as="textarea"
            name="comments"
            id="commente"
            className="form-control border border-black"
          />
          <ErrorMessage name="comments" />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-lable">
            address
          </label>
          <Field name="address">
            {(props) => {
              console.log(props);
              const { field, meta, form } = props;
              return (
                <div>
                  <input
                    type="test"
                    className="form-control border border-black"
                    {...field}
                  />
                  {meta.touched && meta.error ? (
                    <div className="text-danger">{meta.error}</div>
                  ) : null}
                </div>
              );
            }}
          </Field>
        </div>

        <div className="mb-3">
          <lable htmlFor="facebook" className="form-lable">
            Facebook
          </lable>
          <Field
            id="facebook"
            name="social.facebook"
            className="form-control border border-black"
            type="text"
          />
        </div>

        <div className="mb-3">
          <lable htmlFor="twitter" className="form-lable">
            Twitter
          </lable>
          <Field
            id="twitter"
            name="social.twitter"
            type="number"
            className="form-control border border-black"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNumber1" className="form-lable">
            Pirmary phone No.
          </label>
          <Field
            name="phoneNumber[0]"
            id="phoneNumber1"
            className="form-control border border-black"
            type="number"
          />
        </div>

        <div className="mb-3">
          <lable className="form-lable" htmlFor="phoneNumber2">
            Secondary phone number
          </lable>
          <Field
            name="phoneNumber[1]"
            id="phoneNumber2"
            className="form-control border border-black"
            type="number"
          />
        </div>

        <div className="mb-3">
          <lable htmlFor="anotherPhNuber" className="from-lable">
            Add phone numbers
          </lable>
          <FieldArray name="anotherPhNumber">
            {(fieldArrayProps) => {
              console.log("fiels array prop", fieldArrayProps);
              const { form, push, remove } = fieldArrayProps;
              const { values } = form;
              const { anotherPhNumber } = values;
              return (
                <div>
                  {anotherPhNumber.map((singleData, index) => {
                    console.log("myDoubt", singleData, anotherPhNumber);
                    return (
                      <div>
                        <Field
                          type="number"
                          name={`anotherPhNumber[${index}]`}
                        />

                        <button onClick={() => push("")}>add</button>

                        {index > 0 && (
                          <button onClick={() => remove(index)}>delete</button>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            }}
          </FieldArray>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <span style={{ fontSize: "15px" }} className="ms-3">
          Forget Password
        </span>
      </Form>
    </Formik>
  );
}

export default TestForm;
