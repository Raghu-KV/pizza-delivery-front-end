import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";

function SignIn() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Emil is Required")
        .email("should be a vailed email"),
      password: yup.string().required("Passwored is Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control border border-black"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div id="emailHelp" className="form-text text-danger">
              {formik.errors.email}
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
          Forget Password
        </span>
      </form>
      <p>
        Don't have an account try <Link to={"/register"}>REGISTER</Link>{" "}
      </p>
    </div>
  );
}

export default SignIn;
