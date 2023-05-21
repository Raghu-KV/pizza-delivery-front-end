import React from "react";
import SingleProduct from "./SingleProduct";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { saveAllProducts } from "../redux_reducers/product";
import { addToCart } from "../redux_reducers/cart";
import { useState } from "react";
import { BACK_END_URL } from "../URL";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.value);

  const allProducts = async () => {
    const responce = await fetch(`${BACK_END_URL}/products`);
    const data = await responce.json();
    console.log(data);
    dispatch(saveAllProducts(data));
  };

  useEffect(() => {
    allProducts();
  }, []);

  useEffect(() => {
    const parseData = localStorage.getItem("cart");
    if (parseData) {
      const localStorageCartItems = JSON.parse(parseData);
      dispatch(addToCart(localStorageCartItems));
    } else {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, []);

  return (
    <div className="row g-4">
      {products.map((product) => (
        <SingleProduct
          product={product}
          key={product._id}
          allProducts={allProducts}
        />
      ))}
    </div>
  );
}

export default ProductList;
