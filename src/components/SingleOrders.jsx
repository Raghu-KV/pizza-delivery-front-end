function SingleOrders({ order }) {
  console.log(order._id);
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
      <div className="card mx-auto" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title text-success">
            Status : {order.orderStatus}
          </h5>
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
          <h5 className="card-title text-pirmary">Your order items</h5>
        </div>
        <ul className="list-group list-group-flush">
          {order.orders.map((singleOrder) => (
            <li className="list-group-item" key={singleOrder._id}>
              {singleOrder.name} qty : {singleOrder.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SingleOrders;
