import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { BACK_END_URL } from "../URL";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addCustomPizzaData } from "../redux_reducers/customPizza";

function CustomPizza() {
  const dispatch = useDispatch();

  const customPizza = async () => {
    const responce = await fetch(`${BACK_END_URL}/customPizza`);
    const data = await responce.json();
    console.log("custom-pizza Data", data);
    dispatch(addCustomPizzaData(data));
  };

  useEffect(() => {
    customPizza();
  }, []);

  const [message, setMessage] = useState("");
  const formik = useFormik({
    initialValues: {
      pizzaBase: "--SELECT BASE--",
      pizzaSauce: "--SELECT SAUCE--",
      cheese: "--SELECT CHEESE--",
      veggies: [""],
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
          "select a valid base"
        )
        .required("pizza base is required"),
      pizzaSauce: yup
        .string()
        .oneOf(
          ["Pesto", "White garlic sauce", "Hummus", "Onion", "Chilli"],
          "select  a valid sauce"
        )
        .required("pizza sauce is required"),
      cheese: yup
        .string()
        .oneOf(
          ["Gorgonzola", "Provolone", "Emmental", "Cheddar"],
          "select  a valid cheese"
        )
        .required("pizza cheese is required"),
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
            {...formik.getFieldProps("pizzaBase")}
          >
            <option value="">--SELECT BASE--</option>
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
          <label htmlFor="pizzaSauce" className="form-label">
            Pizza Sauce
          </label>
          <select
            className="form-select border border-black"
            type="text"
            id="pizzaSauce"
            aria-describedby="namelHelp"
            name="pizzaSauce"
            value={formik.values.pizzaSauce}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">--SELECT SAUCE--</option>
            <option value="Pesto">Pesto</option>
            <option value="White garlic sauce">White Garilc Sauce</option>
            <option value="Hummus">Hummus</option>
            <option value="Onion">Onion</option>
            <option value="Chilli">Chilli</option>
          </select>
          {formik.touched.pizzaSauce && formik.errors.pizzaSauce ? (
            <div id="emailHelp" className="form-text text-danger">
              {formik.errors.pizzaSauce}
            </div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="pizzaSauce" className="form-label">
            Cheese
          </label>
          <select
            className="form-select border border-black"
            type="text"
            id="cheese"
            aria-describedby="namelHelp"
            name="cheese"
            value={formik.values.cheese}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">--SELECT CHEESE--</option>
            <option value="Gorgonzola">Gorgonzola</option>
            <option value="Provolone">Provolone</option>
            <option value="Emmental">Emmental</option>
            <option value="Cheddar">Cheddar</option>
          </select>
          {formik.touched.cheese && formik.errors.cheese ? (
            <div id="emailHelp" className="form-text text-danger">
              {formik.errors.cheese}
            </div>
          ) : null}
        </div>

        {/* <div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              name={veggies[0]}
              value={formik.values.veggies[0]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label className="form-check-label" htmlFor="inlineCheckbox1">
              1
            </label>
          </div>
        </div> */}

        {/* <div className="mb-3">
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
        </div> */}

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
