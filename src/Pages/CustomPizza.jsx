import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { BACK_END_URL } from "../URL";
import { useState } from "react";

function CustomPizza() {
  const [message, setMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      pizzaBase: "Stuffed crust",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      pizzaBase: yup
        .string()
        .oneOf(
          [
            "Stuffed crust",
            "Cracker crust",
            "Flat bread crust",
            "Thin crust",
            "Cheese crust",
          ],
          "not valid"
        )
        .required("pizza base is required"),
      email: yup
        .string()
        .required("Emil is Required")
        .email("should be a vailed email"),
      password: yup
        .string()
        .min(7, "Password must be 7 character or above")
        .required("Passwored is Required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="pizzaBase" className="form-label">
            Pizza Base
          </label>
          <select
            className="form-select border border-black"
            type="text"
            id="pizzaBase"
            aria-describedby="namelHelp"
            name="pizzaBase"
            value={formik.values.pizzaBase}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="Stuffed crust">Stuffed Crust</option>
            <option value="Cracker crust">Cracker Crust</option>
            <option value="Flat bread crust">Flat Bread Crust</option>
            <option value="Thin crust">Thin Crust</option>
            <option value="Cheese crust">Cheese Crust</option>
          </select>
          {formik.touched.pizzaBase && formik.errors.pizzaBase ? (
            <div id="emailHelp" className="form-text text-danger">
              {formik.errors.pizzaBase}
            </div>
          ) : null}
        </div>

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
        Already have an account try <Link to={"/signIn"}>SIGN IN</Link>{" "}
      </p>
      <p className="text-success fw-semibold fs-4">{message}</p>
    </div>
  );
}

export default CustomPizza;
