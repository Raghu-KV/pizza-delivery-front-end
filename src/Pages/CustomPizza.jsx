import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { BACK_END_URL } from "../URL";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addCustomPizzaData } from "../redux_reducers/customPizza";
import DeleteTextError from "../components/DeleteTextError";

function CustomPizza() {
  const dispatch = useDispatch();

  const customPizza = async () => {
    const responce = await fetch(`${BACK_END_URL}/customPizza`);
    const data = await responce.json();

    dispatch(addCustomPizzaData(data));
  };

  useEffect(() => {
    customPizza();
  }, []);

  const customPizzaData = useSelector((state) => state.customPizza.value);

  useEffect(() => {
    if (!customPizzaData.length === 0) {
      const [
        allPizzaBasesObj,
        allPizzaSaucesObj,
        allPizzaCheeseObj,
        allVeggiesObj,
        allMeatObj,
      ] = customPizzaData;

      const { allPizzaBases } = allPizzaBasesObj;
      const { allPizzaSauces } = allPizzaSaucesObj;
      const { allPizzaCheese } = allPizzaCheeseObj;
      const { allVeggies } = allVeggiesObj;
      const { allMeat } = allMeatObj;

      console.log(
        "this is the one",
        allPizzaBases,
        allPizzaSauces,
        allPizzaCheese,
        allVeggies,
        allMeat
      );
    }
  }, [customPizzaData]);

  const initialValues = {
    test: "",
  };

  const validationSchema = yup.object({
    test: yup.string().required("this is test and it is required"),
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(props) => {
        const { isSubmitting } = props;
        return (
          <Form>
            <div className="mb-3">
              <label htmlFor="testForm" className="form-label">
                enter Test
              </label>
              <Field
                name="test"
                id="testForm"
                className="form-control border border-black"
              />
              <ErrorMessage name="test" component={DeleteTextError} />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Add to Cart
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default CustomPizza;
