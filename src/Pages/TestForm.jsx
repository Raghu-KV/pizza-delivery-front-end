import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { BACK_END_URL } from "../URL";
import { useState } from "react";

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

  const initialValues = { userName: "", email: "", password: "" };
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
          <ErrorMessage name="userName" />
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
          <ErrorMessage name="email" />
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
          <ErrorMessage name="password" />
          {/* {formik.touched.password && formik.errors.password ? (
            <div id="emailHelp" className="form-text text-danger">
              {formik.errors.password}
            </div>
          ) : null} */}
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
