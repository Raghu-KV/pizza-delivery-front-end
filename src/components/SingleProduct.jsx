import React from "react";

function SingleProduct({ product }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
      <div className="card mx-auto text-center" style={{ width: "18rem" }}>
        <img src={product.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title fw-bolder  fs-4">{product.name}</h5>
          <p className="card-text mb-0">
            One of the simplest and most traditional pizzas is the Margherita,
            which is topped with tomatoes or tomato sauce, mozzarella, and
            basil.
          </p>
          <p className="card-text fw-bolder my-2 fs-5">Rs.{product.price}</p>
          <a href="#" className="btn btn-primary">
            Add to Cart
          </a>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
