import { useEffect } from "react";
import { BACK_END_URL } from "../URL";
import { useDispatch } from "react-redux";
import { reduxAddAllOrders } from "../redux_reducers/allOrders";
import { useSelector } from "react-redux";

function AdminAllOrders() {
  const allOrders = useSelector((state) => state.allOrders.value);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const fetchAllOrders = async () => {
    const responce = await fetch(`${BACK_END_URL}/admin/allOrders`, {
      method: "GET",
      headers: { "x-auth-token": token },
    });

    const allOrdersData = await responce.json();
    const arrangedAllOrders = allOrdersData.reverse();
    dispatch(reduxAddAllOrders(arrangedAllOrders));
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);
  console.log(allOrders);
  return <div>AdminAllOrders</div>;
}

export default AdminAllOrders;
