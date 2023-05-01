import { useSelector } from "react-redux";
import CartSingleItem from "../components/CartSingleItem";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux_reducers/cart";

function Cart() {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  useEffect(() => {
    const cartLocalData = localStorage.getItem("cart");
    const verifyData = JSON.parse(cartLocalData);

    const newCartItems = [...verifyData];
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    dispatch(addToCart(newCartItems));
  }, []);

  return (
    <div className="row">
      <div className="col-sm-12 col-md-12 col-lg-8">
        <div className="row g-4">
          {cart.map((singleCart) => (
            <CartSingleItem singleCart={singleCart} key={singleCart._id} />
          ))}
        </div>
      </div>
      <div className="col-sm-12 col-md-12 col-lg-4 bg-primary-subtle h-25">
        f
      </div>
    </div>
  );
}

export default Cart;
