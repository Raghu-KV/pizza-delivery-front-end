import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";
import DeleteTextError from "../components/DeleteTextError";
import { BACK_END_URL } from "../URL";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function EditPizzaMeat() {
  const { meatItem } = useParams();

  const customItemName = useSelector((state) => state.customPizza.value);
  const pizzaMeat = customItemName[4];
  const { allMeat } = pizzaMeat;
  const correctItem = allMeat.find((data) => data.meat === meatItem);

  //console.log(sauceItem, allPizzaSauces, correctItem);

  const initialValues = {
    meat: correctItem.meat,
    price: correctItem.price,
    countInStock: correctItem.countInStock,
  };
  const validationSchema = yup.object({
    meat: yup.string().required("Pizza Sauce is required"),
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
    const responce = await fetch(`${BACK_END_URL}/editCustomMeat/${meatItem}`, {
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
      {(formik) => (
        <Form>
          <div className="mb-3">
            <label htmlFor="meat" className="form-label">
              Enter pizza Meat
            </label>
            <Field
              type="text"
              className="form-control border border-black"
              id="meat"
              name="meat"
            />

            <ErrorMessage name="meat" component={DeleteTextError} />
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

          <button
            type="submit"
            className="btn btn-primary"
            disabled={formik.isSubmitting}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default EditPizzaMeat;
