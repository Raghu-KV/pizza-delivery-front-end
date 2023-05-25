import { useEffect } from "react";
import { BACK_END_URL } from "../URL";
import { useDispatch } from "react-redux";
import { reduxAddAllOrders } from "../redux_reducers/allOrders";
import { useSelector } from "react-redux";
import AdminSingleOrders from "../components/AdminSingleOrders";
import { useState } from "react";

function AdminAllOrders() {
  const allOrders = useSelector((state) => state.allOrders.value);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    const responce = await fetch(`${BACK_END_URL}/admin/allOrders`, {
      method: "GET",
      headers: { "x-auth-token": token },
    });

    const allOrdersData = await responce.json();
    const arrangedAllOrders = allOrdersData.reverse();
    dispatch(reduxAddAllOrders(arrangedAllOrders));
    setLoading(false);
    setSearch("");
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);
  console.log(allOrders);

  const findUsingPaymentId = async () => {
    setLoading(true);
    const responce = await fetch(
      `${BACK_END_URL}/admin/allOrders?razorpay_payment_id=${search}`,
      {
        method: "GET",
        headers: { "x-auth-token": token },
      }
    );

    const allOrdersData = await responce.json();
    const arrangedAllOrders = allOrdersData.reverse();
    dispatch(reduxAddAllOrders(arrangedAllOrders));
    setLoading(false);
  };

  return (
    <div className="">
      <h2 className="text-center">all orders</h2>

      <div className="d-flex">
        <input
          type="text"
          className="form-control border border-primary"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          style={{ display: "block" }}
          placeholder="Enter razorpay_payment_id to search..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary ms-2"
          onClick={findUsingPaymentId}
        >
          Search
        </button>
      </div>

      <div class="d-grid mt-3">
        <button
          class="btn btn-secondary"
          type="button"
          onClick={fetchAllOrders}
        >
          Show all Orders
        </button>
      </div>

      {loading ? (
        "Loading..."
      ) : (
        <div className="row g-4 mt-3">
          {allOrders.map((singleData) => (
            <AdminSingleOrders order={singleData} key={singleData._id} />
          ))}
        </div>
      )}
      {allOrders.length === 0 && !loading && (
        <h4>We could no find the request</h4>
      )}
    </div>
  );
}

export default AdminAllOrders;
