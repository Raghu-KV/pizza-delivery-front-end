import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux_reducers/cart";
import { useState, useEffect } from "react";

function SingleProduct({ product }) {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    cart.map((item) => {
      if (item._id === product._id) {
        setIsButtonDisabled(true);
      }
    });
  }, [cart]);

  const addItemToCart = (product) => {
    const productWithQuantanty = { ...product, quantity: 1 };
    dispatch(addToCart(productWithQuantanty));
    //console.log(cart);
  };

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
          <button
            className="btn btn-primary"
            onClick={() => addItemToCart(product)}
            disabled={isButtonDisabled}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
