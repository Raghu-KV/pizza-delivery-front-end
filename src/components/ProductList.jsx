import React from "react";
import SingleProduct from "./SingleProduct";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { saveAllProducts } from "../redux_reducers/product";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.value);

  const allProducts = async () => {
    const responce = await fetch("http://localhost:4000/products");
    const data = await responce.json();
    console.log(data);
    dispatch(saveAllProducts(data));
  };

  useEffect(() => {
    allProducts();
  }, []);

  return (
    <div className="row g-4">
      {products.map((product) => (
        <SingleProduct product={product} key={product._id} />
      ))}
    </div>
  );
}

export default ProductList;
