import ProductList from "../components/ProductList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCustomPizzaData } from "../redux_reducers/customPizza";
import { BACK_END_URL } from "../URL";
function Home() {
  const dispatch = useDispatch();

  const customPizza = async () => {
    const responce = await fetch(`${BACK_END_URL}/customPizza`);
    const data = await responce.json();
    console.log(data);

    dispatch(addCustomPizzaData(data));
  };

  useEffect(() => {
    customPizza();
  }, []);
  return <ProductList />;
}

export default Home;
