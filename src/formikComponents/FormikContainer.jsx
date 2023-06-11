import { Formik, Form } from "formik";
import * as yup from "yup";
import FormikCountrol from "./FormikCountrol";

function FormikContainer() {
  const initialValues = {
    email: "none",
    comment: "",
    village: "",
    mealOptionRadio: "",
    foodItemsCheckbox: [],
  };
  const validationSchema = yup.object({
    email: yup.string().required("Email required"),
    village: yup.string().required("Must select any village"),
    mealOptionRadio: yup.string().required("select meal"),
    foodItemsCheckbox: yup
      .array()
      .min(1, "must select")
      .required("this is required"),
  });
  const onSubmit = (values) => {
    console.log("form Container values", values);
  };

  const villageOptions = [
    { value: "", key: "--SELECT ANY VILLAGE--" },
    { value: "chennimalai", key: "Chennimalai" },
    { value: "erode", key: "Erode" },
    { value: "preundurai", key: "Perundurai" },
  ];

  const mealItems = [
    { value: "fish", key: "Fish" },
    { value: "chicken", key: "Chicken" },
    { value: "mutton", key: "Mutton" },
    { value: "duck", key: "duck" },
  ];

  const foodItems = [
    { value: "rice", key: "Rice" },
    { value: "sambar", key: "Sambar" },
    { value: "vegetables", key: "vegetables" },
    { value: "rasam", key: "Rasam" },
  ];
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(fromik) => (
        <Form>
          <FormikCountrol
            control="input"
            name="email"
            type="email"
            className="form-control border border-black"
            label="Enter your email"
          />

          <FormikCountrol
            control="textarea"
            name="comment"
            className="form-control border border-black"
            label="Enter your comment"
          />
          <FormikCountrol
            control="select"
            name="village"
            lable="Select Village"
            className="form-select border border-black"
            villageOptions={villageOptions}
          />

          <FormikCountrol
            control="radio"
            name="mealOptionRadio"
            label="Select any Meal Option"
            className="form-check-input"
            mealItems={mealItems}
          />

          <FormikCountrol
            control="checkbox"
            name="foodItemsCheckbox"
            label="Select items you want"
            className="form-check-input"
            foodItems={foodItems}
          />

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default FormikContainer;
