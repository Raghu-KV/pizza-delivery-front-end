import { useSelector } from "react-redux";
import CartSingleItem from "../components/CartSingleItem";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux_reducers/cart";
import { useNavigate } from "react-router-dom";
import { BACK_END_URL } from "../URL";

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
  //--------------------------------------

  //pay now function -----------------------
  const navigate = useNavigate();
  const handlePayNow = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("user in logged in we can proceeed", token);
      const responce = await fetch(`${BACK_END_URL}/orders`, {
        method: "POST",
      });
      const paymentDetails = await responce.json();
      console.log(paymentDetails);
    } else {
      navigate("/signIn");
    }
  };
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

        <div className="col-sm-12 col-md-12 col-lg-4">
          <div className="mt-3 mx-3 px-3 rounded-4 text-center py-3 bg-primary-subtle">
            <h6>Net price : {price}</h6>
            <h6>GST @5% : {percentageInPrice}</h6>
            <h6>Total price : {priceAfterTax}</h6>
            <button
              type="button"
              className="btn btn-dark d-block"
              style={{ width: "100%" }}
              onClick={handlePayNow}
            >
              PAY NOW
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="text-center">No items in Cart</div>;
  }
}

export default Cart;
