import { useEffect } from "react";
import { BACK_END_URL } from "../URL";

function Orders() {
  const userId = localStorage.getItem("userId");
  console.log(userId);

  const fetchOrders = async () => {
    const responce = await fetch(`${BACK_END_URL}/orders/${userId}`);
    const ordersData = await responce.json();
    console.log(ordersData);
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return <div>Orders</div>;
}

export default Orders;
