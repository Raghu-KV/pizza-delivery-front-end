import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { BACK_END_URL, FRONT_END_URL } from "../URL";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [res, setRes] = useState({ message: "" });
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: yup.object({
      userName: yup.string().required("user name is Required"),

      password: yup.string().required("Passwored is Required"),
    }),
    onSubmit: async (values) => {
      //console.log(values);
      const responce = await fetch(`${BACK_END_URL}/signIn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await responce.json();
      console.log(data);
      setRes(data);
    },
  });
  const navigate = useNavigate();

  if (res.token) {
    localStorage.setItem("token", res.token);
    localStorage.setItem("isAdmin", res.isAdmin);
    window.location = `${FRONT_END_URL}`;
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            User name
          </label>
          <input
            type="text"
            className="form-control border border-black"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.userName && formik.errors.userName ? (
            <div id="emailHelp" className="form-text text-danger">
              {formik.errors.userName}
            </div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control border border-black"
            id="exampleInputPassword1"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div id="emailHelp" className="form-text text-danger">
              {formik.errors.password}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={formik.isSubmitting}
        >
          Submit
        </button>
        <span style={{ fontSize: "15px" }} className="ms-3">
          <Link to={"/forgetPassword"}>Forget Password</Link>
        </span>
      </form>
      <p>
        Don't have an account try <Link to={"/register"}>REGISTER</Link>{" "}
      </p>
      <p>{res.message}</p>
    </div>
  );
}

export default SignIn;
