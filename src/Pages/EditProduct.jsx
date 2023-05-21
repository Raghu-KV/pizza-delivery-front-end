import { useFormik } from "formik";
import * as yup from "yup";
import { BACK_END_URL } from "../URL";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function EditProduct() {
  const products = useSelector((state) => state.products.value);

  const { id } = useParams();
  console.log(id, products);

  const valuesForProduct = products.filter((product) => product._id === id);
  console.log(valuesForProduct);

  const { name, image, price, _id, countInStock } = valuesForProduct[0];

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: name,
      image: image,
      price: price,
      countInStock: countInStock,
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      image: yup
        .string()
        .required("Image URL required")
        .matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          "Enter correct url!"
        ),
      price: yup
        .number()
        .min(1, "must be a grater than 1")
        .max(1000, "vaipu illa raja")
        .required("price is required"),
      countInStock: yup
        .number()
        .min(1, "must be a grater than 1")
        .max(100, "godown la edam ill pa")
        .required("quantity required"),
    }),
    onSubmit: async (values, actions) => {
      //console.log(values);
      const token = localStorage.getItem("token");
      const responce = await fetch(`${BACK_END_URL}/editProduct/${_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body: JSON.stringify(values),
      });
      const data = await responce.json();
      setMessage(data.message);
      navigate("/");
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            className="form-control border border-black"
            id="exampleInputName"
            aria-describedby="namelHelp"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div id="nameHelp" className="form-text text-danger">
              {formik.errors.name}
            </div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="exampleImage" className="form-label">
            Product Image URL
          </label>
          <input
            type="text"
            className="form-control border border-black"
            id="exampleImage"
            aria-describedby="exampleImage"
            name="image"
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.image && formik.errors.image ? (
            <div id="emailHelp" className="form-text text-danger">
              {formik.errors.image}
            </div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control border border-black"
            id="productPrice"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.price && formik.errors.price ? (
            <div id="emailHelp" className="form-text text-danger">
              {formik.errors.price}
            </div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="productQty" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            className="form-control border border-black"
            id="productQty"
            name="countInStock"
            value={formik.values.countInStock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.countInStock && formik.errors.countInStock ? (
            <div id="emailHelp" className="form-text text-danger">
              {formik.errors.countInStock}
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
      </form>
      <p>{message}</p>
    </div>
  );
}

export default EditProduct;
