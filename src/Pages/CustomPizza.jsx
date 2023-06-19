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
        allPizzaSaucesObj,
        allPizzaCheeseObj,
        allVeggiesObj,
        allMeatObj,
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
    pizzaSauce: "",
    pizzaCheese: "",
    veggies: [],
    meat: [],
  };

  const validationSchema = yup.object({
    pizzaBase: yup.string().required("pizza base is required"),
    pizzaSauce: yup.string().required("pizza sauce is required"),
    pizzaCheese: yup.string().required("pizza cheese is required"),
    veggies: yup
      .array()
      .min(1, "any one veggies should be selected")
      .required("veggies is required"),
    meat: yup.array(),
  });

  const onSubmit = (values, action) => {
    const addedCustomPizza = { ...values, isCustomPizza: true };
    console.log(addedCustomPizza);

    //action.resetForm();
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
              <ErrorMessage name="pizzaBase" component={DeleteTextError} />
            </div>

            <div className="mb-3">
              <label className="form-label d-block">Select Pizza Sauce</label>
              <Field name="pizzaSauce">
                {(props) => {
                  const { field } = props;
                  return allPizzaSauces.map((singlePizzaSauce) => (
                    <div
                      className="form-check form-check-inline"
                      key={singlePizzaSauce.pizzaSauce}
                    >
                      <input
                        type="radio"
                        {...field}
                        value={singlePizzaSauce.pizzaSauce}
                        checked={field.value === singlePizzaSauce.pizzaSauce}
                        className="form-check-input"
                        id={singlePizzaSauce.pizzaSauce}
                      />

                      <label
                        htmlFor={singlePizzaSauce.pizzaSauce}
                        className="form-check-label"
                      >
                        {singlePizzaSauce.pizzaSauce} Rs.
                        {singlePizzaSauce.price}
                      </label>
                    </div>
                  ));
                }}
              </Field>
              <ErrorMessage name="pizzaSauce" component={DeleteTextError} />
            </div>

            <div className="mb-3">
              <label className="form-label d-block">Select Pizza Cheese</label>
              <Field name="pizzaCheese">
                {(props) => {
                  const { field } = props;
                  return allPizzaCheese.map((singlePizzaCheese) => (
                    <div
                      className="form-check form-check-inline"
                      key={singlePizzaCheese.pizzaCheese}
                    >
                      <input
                        type="radio"
                        {...field}
                        value={singlePizzaCheese.pizzaCheese}
                        checked={field.value === singlePizzaCheese.pizzaCheese}
                        className="form-check-input"
                        id={singlePizzaCheese.pizzaCheese}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={singlePizzaCheese.pizzaCheese}
                      >
                        {singlePizzaCheese.pizzaCheese} Rs.
                        {singlePizzaCheese.price}
                      </label>
                    </div>
                  ));
                }}
              </Field>
              <ErrorMessage name="pizzaCheese" component={DeleteTextError} />
            </div>

            <div className="mb-3">
              <label className="form-label d-block">
                Select pizza Veggies Free up to 2 veggies
              </label>
              <Field name="veggies">
                {(props) => {
                  const { field } = props;
                  return allVeggies.map((singleVeggies) => (
                    <div
                      className="form-check form-check-inline"
                      key={singleVeggies.veggies}
                    >
                      <input
                        type="checkbox"
                        {...field}
                        value={singleVeggies.veggies}
                        checked={field.value.includes(singleVeggies.veggies)}
                        id={singleVeggies.veggies}
                        className="form-check-input"
                      />
                      <label
                        htmlFor={singleVeggies.veggies}
                        className="form-check-label"
                      >
                        {singleVeggies.veggies}
                        Rs.{singleVeggies.price}
                      </label>
                    </div>
                  ));
                }}
              </Field>
              <ErrorMessage name="veggies" component={DeleteTextError} />
            </div>

            <div className="mb-3">
              <label className="form-label d-block">
                Select Meat Free up to 1 meat
              </label>
              <Field name="meat">
                {(props) => {
                  const { field } = props;
                  return allMeat.map((singleMeat) => (
                    <div
                      className="form-check form-check-inline"
                      key={singleMeat.meat}
                    >
                      <input
                        type="checkbox"
                        {...field}
                        value={singleMeat.meat}
                        checked={field.value.includes(singleMeat.meat)}
                        id={singleMeat.meat}
                        className="form-check-input"
                      />
                      <label
                        htmlFor={singleMeat.meat}
                        className="form-check-label"
                      >
                        {singleMeat.meat} Rs. {singleMeat.price}
                      </label>
                    </div>
                  ));
                }}
              </Field>
              <ErrorMessage name="meat" component={DeleteTextError} />
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
