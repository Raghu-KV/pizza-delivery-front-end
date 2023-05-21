import { useEffect } from "react";
import { BACK_END_URL } from "../URL";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addItemToOrders } from "../redux_reducers/orders";
import { useState } from "react";
import SingleOrders from "../components/SingleOrders";

function Orders() {
  const orders = useSelector((state) => state.orders.value);
  const ordersReverse = orders.reverse();
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  console.log(userId);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const responce = await fetch(`${BACK_END_URL}/orders/${userId}`);
    const ordersData = await responce.json();
    //console.log(ordersData);
    dispatch(addItemToOrders(ordersData));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(orders, "redux");
  if (orders.length > 0) {
    return (
      <div className="text-center">
        <h3>Your Orders 😋</h3>

        <div className="row g-4 mt-3">
          {ordersReverse.map((order) => (
            <SingleOrders order={order} key={order._id} />
          ))}
        </div>
      </div>
    );
  } else {
    return <h3>{loading ? "loading..." : "you dont have any orders"}</h3>;
  }
}

export default Orders;
