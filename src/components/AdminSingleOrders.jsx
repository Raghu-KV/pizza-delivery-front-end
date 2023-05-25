import { useState } from "react";
import { BACK_END_URL } from "../URL";

function AdminSingleOrders({ order }) {
  const [status, setStatus] = useState(order.orderStatus);
  const [loading, setLoading] = useState("Apply changes");
  console.log(order._id);

  const token = localStorage.getItem("token");

  const changeOrderStatus = async () => {
    setLoading("loading...");
    const data = { status: status, id: order._id };
    const responce = await fetch(`${BACK_END_URL}/changeStatus`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-auth-token": token },
      body: JSON.stringify(data),
    });
    const conResponce = await responce.json();
    console.log(conResponce);
    if (conResponce.message === "updated the status") {
      setLoading("Apply changes");
    } else {
      setLoading("Could't update");
    }
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
      <div className="card mx-auto" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title text-success">Status</h5>
          {order.orderStatus !== "delivered" ? (
            <select
              className="form-select"
              aria-label="Default select example"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="order accepted">order accepted</option>
              <option value="order cancled">order cancled</option>
              <option value="preparing">preparing</option>
              <option value="out for delivery">out for delivery</option>
              <option value="delivered">delivered</option>
            </select>
          ) : (
            "order delivered"
          )}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            order id : {order.razorpay_order_id}
          </li>
          <li className="list-group-item">
            payment id: {order.razorpay_payment_id}
          </li>
        </ul>
        <div className="card-body">
          <h5 className="card-title text-pirmary">
            Ordered by : {order.paidUser}
          </h5>
        </div>
        <ul className="list-group list-group-flush">
          {order.orders.map((singleOrder) => (
            <li className="list-group-item" key={singleOrder._id}>
              {singleOrder.name} qty : {singleOrder.quantity}
            </li>
          ))}
        </ul>
        <button
          className="btn btn-primary"
          type="button"
          onClick={changeOrderStatus}
        >
          {loading}
        </button>
      </div>
    </div>
  );
}

export default AdminSingleOrders;
