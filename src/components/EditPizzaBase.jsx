import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";
import DeleteTextError from "../components/DeleteTextError";
import { BACK_END_URL } from "../URL";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function EditPizzaBase() {
  const { baseItem } = useParams();

  const baseItemName = useSelector((state) => state.customPizza.value);
  const pizzaBases = baseItemName[0];
  const { allPizzaBases } = pizzaBases;
  const correctItem = allPizzaBases.find((data) => data.pizzaBase === baseItem);

  console.log(baseItem, allPizzaBases, correctItem);

  const initialValues = {
    pizzaBase: correctItem.pizzaBase,
    price: correctItem.price,
    countInStock: correctItem.countInStock,
  };
  const validationSchema = yup.object({
    pizzaBase: yup.string().required("Pizza Base is required"),
    price: yup
      .number()
      .min(1, "cannot give negitive numbers")
      .required("Price is Required"),

    countInStock: yup
      .number()
      .min(1, "cannot give negitive numbers")
      .required("Stock is Required"),
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const formSubmit = async (values) => {
    const responce = await fetch(`${BACK_END_URL}/editCustomBase/${baseItem}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-auth-token": token },
      body: JSON.stringify(values),
    });
    navigate("/");
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
          <label htmlFor="pizzaBase" className="form-label">
            Enter pizza base
          </label>
          <Field
            type="text"
            className="form-control border border-black"
            id="pizzaBase"
            name="pizzaBase"
          />

          <ErrorMessage name="pizzaBase" component={DeleteTextError} />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Enter price
          </label>
          <Field
            type="number"
            className="form-control border border-black"
            id="price"
            name="price"
          />

          <ErrorMessage name="price" component={DeleteTextError} />
        </div>

        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Enter No. stock
          </label>
          <Field
            type="number"
            className="form-control border border-black"
            id="stock"
            name="countInStock"
          />

          <ErrorMessage name="countInStock" component={DeleteTextError} />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </Formik>
  );
}

export default EditPizzaBase;
