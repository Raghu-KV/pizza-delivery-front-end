import { useSelector } from "react-redux";

function Cart() {
  const cart = useSelector((state) => state.cart.value);

  return <div>Cart</div>;
}

export default Cart;
