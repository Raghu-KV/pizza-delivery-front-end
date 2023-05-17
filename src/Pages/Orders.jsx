import { useEffect } from "react";
import { BACK_END_URL } from "../URL";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addItemToOrders } from "../redux_reducers/orders";
import { useState } from "react";

function Orders() {
  const orders = useSelector((state) => state.orders.value);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  console.log(userId);
  const [username, setUsername] = useState("loading...");

  const fetchOrders = async () => {
    const responce = await fetch(`${BACK_END_URL}/orders/${userId}`);
    const ordersData = await responce.json();
    console.log(ordersData);
    dispatch(addItemToOrders(ordersData));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  //   useEffect(() => {
  //     setUsername("test");
  //   }, [orders]);

  console.log(orders, "redux");
  return (
    <div className="text-center">
      <h3>welcome 😋 {username}</h3>
    </div>
  );
}

export default Orders;
