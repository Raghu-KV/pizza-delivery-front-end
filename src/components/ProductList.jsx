import React from "react";
import SingleProduct from "./SingleProduct";
import { products } from "./../product";

function ProductList() {
  return (
    <div className="row g-4">
      {products.map((product) => (
        <SingleProduct product={product} />
      ))}
    </div>
  );
}

export default ProductList;
