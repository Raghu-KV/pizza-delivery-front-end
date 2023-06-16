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

    dispatch(addCustomPizzaData(data));
  };

  useEffect(() => {
    customPizza();
  }, []);

  const customPizzaData = useSelector((state) => state.customPizza.value);

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

  return <div>custom pizza</div>;
}

export default CustomPizza;
