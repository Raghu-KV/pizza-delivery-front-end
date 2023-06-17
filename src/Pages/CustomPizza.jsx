import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { BACK_END_URL } from "../URL";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCustomPizzaData } from "../redux_reducers/customPizza";
import DeleteTextError from "../components/DeleteTextError";
import { useState } from "react";

function CustomPizza() {
  const dispatch = useDispatch();
  const [customPizzaData, setCustomPizzaData] = useState([]);

  const customPizza = async () => {
    const responce = await fetch(`${BACK_END_URL}/customPizza`);
    const data = await responce.json();
    console.log(data);
    setCustomPizzaData(data);
    dispatch(addCustomPizzaData(data));
  };

  useEffect(() => {
    customPizza();
  }, []);

  //const customPizzaData = useSelector((state) => state.customPizza.value);

  const [allPizzaBases, setAllPizzaBases] = useState([]);
  const [allPizzaSauces, setAllPizzaSauces] = useState([]);
  const [allPizzaCheese, setAllPizzaCheese] = useState([]);
  const [allVeggies, setAllVeggies] = useState([]);
  const [allMeat, setAllMeat] = useState([]);

  useEffect(() => {
    if (customPizzaData.length !== 0) {
      const [
        allPizzaBasesObj,
        allVeggiesObj,
        allPizzaCheeseObj,
        allMeatObj,
        allPizzaSaucesObj,
      ] = customPizzaData;

      const { allPizzaBases } = allPizzaBasesObj;
      setAllPizzaBases(allPizzaBases);
      const { allPizzaSauces } = allPizzaSaucesObj;
      setAllPizzaSauces(allPizzaSauces);
      const { allPizzaCheese } = allPizzaCheeseObj;
      setAllPizzaCheese(allPizzaCheese);
      const { allVeggies } = allVeggiesObj;
      setAllVeggies(allVeggies);
      const { allMeat } = allMeatObj;
      setAllMeat(allMeat);
    }
  }, [customPizzaData]);

  console.log(
    "this is the one",
    allPizzaBases,
    "all pizza base",
    allPizzaSauces,
    "all pizza sauce",
    allPizzaCheese,
    "all pizza cheze",
    allVeggies,
    "all veggies",
    allMeat,
    "all meat"
  );

  const initialValues = {
    pizzaBase: "",
  };

  const validationSchema = yup.object({
    pizzaBase: yup.string().required("this is test and it is required"),
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
              <label htmlFor="testForm" className="form-label d-block">
                Select Pizza Base
              </label>
              <Field name="pizzaBase">
                {(props) => {
                  console.log(props);
                  const { field } = props;
                  return allPizzaBases.map((singlePizzaBase) => (
                    <div
                      className="form-check form-check-inline"
                      key={singlePizzaBase.pizzaBase}
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        {...field}
                        value={singlePizzaBase.pizzaBase}
                        checked={singlePizzaBase.pizzaBase === field.value}
                        id={singlePizzaBase.pizzaBase}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={singlePizzaBase.pizzaBase}
                      >
                        {singlePizzaBase.pizzaBase} Rs.{singlePizzaBase.price}
                      </label>
                    </div>
                  ));
                }}
              </Field>
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
