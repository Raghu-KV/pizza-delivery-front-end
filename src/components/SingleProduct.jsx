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

    const cartLocalData = localStorage.getItem("cart");
    const verifyData = JSON.parse(cartLocalData);

    // if (verifyData.length === 0) {
    //   cartItems.push(productWithQuantanty);
    //   console.log(cartItems);
    //   localStorage.setItem("cart", JSON.stringify(cartItems));
    //   const localStorageCartItem = localStorage.getItem("cart");
    //   const convertedLocalStorageCartItem = JSON.parse(localStorageCartItem);
    //   dispatch(addToCart(convertedLocalStorageCartItem));
    // } else {
    // const cartLocalData = localStorage.getItem("cart");
    // const verifyData = JSON.parse(cartLocalData); //this is an array
    const newCartItems = [...verifyData, productWithQuantanty];
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    dispatch(addToCart(newCartItems));
    console.log("something in local storage", newCartItems);
    // }
    // if (cartToStringify.length === 0) {
    //   cartItems.push(productWithQuantanty);
    //   console.log(cartItems);
    //   localStorage.setItem("cart", JSON.stringify(cartItems));
    //   const localStorageCartItems = JSON.parse(parseData);
    //   dispatch(addToCart(localStorageCartItems));
    // } else {
    //   const oldCartItem = [...cartItems, productWithQuantanty];
    //   // localStorage.setItem("cart", JSON.stringify(oldCartItem));
    //   // const localStorageCartItems = JSON.parse(parseData);
    //   // dispatch(addToCart(localStorageCartItems));
    //   console.log(oldCartItem);
    // }

    // const localStorageCartItems = JSON.parse(parseData);
    // //console.log(localStorageCartItems);
    // dispatch(addToCart(localStorageCartItems));
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
