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

  const totalProductPrice = cart.map(
    (singleCartItem) => singleCartItem.price * singleCartItem.quantity
  );
  console.log(cart, totalProductPrice);

  // total price for cart items --------------
  let price = 0;
  for (let i = 0; i < totalProductPrice.length; i++) {
    price += totalProductPrice[i];
  }
  console.log(price);
  // ----------------------------------

  //GST----------------------------------
  const percentageInPrice = (price * 5) / 100;
  const priceAfterTax = Math.round(price + percentageInPrice);
  if (cart.length > 0) {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-8">
          <div className="row g-4">
            {cart.map((singleCart) => (
              <CartSingleItem singleCart={singleCart} key={singleCart._id} />
            ))}
          </div>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-4 bg-primary-subtle h-25 rounded-4 text-center py-3">
          <h6>Net price : {price}</h6>
          <h6>GST @5% : {percentageInPrice}</h6>
          <h6>Total price : {priceAfterTax}</h6>
          <button
            type="button"
            class="btn btn-dark d-block"
            style={{ width: "100%" }}
          >
            PAY NOW
          </button>
        </div>
      </div>
    );
  } else {
    return <div className="text-center">No items in Cart</div>;
  }
}

export default Cart;
