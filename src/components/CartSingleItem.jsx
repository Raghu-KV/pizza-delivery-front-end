import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromCart } from "../redux_reducers/cart";
import { changeQuantity } from "../redux_reducers/cart";
import { useState, useEffect } from "react";

function CartSingleItem({ singleCart }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(singleCart.quantity);

  const deleteTheItem = () => {
    const localStoredCart = localStorage.getItem("cart");
    const parsedlocalStoredCart = JSON.parse(localStoredCart);
    const newCartData = parsedlocalStoredCart.filter(
      (data) => data._id !== singleCart._id
    );
    localStorage.setItem("cart", JSON.stringify(newCartData));
    dispatch(deleteItemFromCart(newCartData));
    console.log("clicked", singleCart, parsedlocalStoredCart, newCartData);
  };

  const updateQuantity = (event) => {
    setQuantity(event.target.value);

    // const localStoredCart = localStorage.getItem("cart");
    // const parsedlocalStoredCart = JSON.parse(localStoredCart);
    // parsedlocalStoredCart.map((data) => {
    //   if (data._id === singleCart._id) {
    //     data.quantity = +quantity;
    //   }
    // });
    // console.log(parsedlocalStoredCart);
  };

  useEffect(() => {
    console.log("changed in quantity");
    const changedQty = { ...singleCart, quantity: +quantity };
    console.log(changedQty);
    dispatch(changeQuantity(changedQty));

    const localStoredCart = localStorage.getItem("cart");
    const parsedlocalStoredCart = JSON.parse(localStoredCart);

    //console.log("before Map :", parsedlocalStoredCart);
    parsedlocalStoredCart.map((data) => {
      if (data._id === changedQty._id) {
        data.quantity = changedQty.quantity;
      }
    });

    localStorage.setItem("cart", JSON.stringify(parsedlocalStoredCart));
    // console.log("after map :", changedQty.quantity);
    // console.log("after map :", parsedlocalStoredCart);
  }, [quantity]);

  return (
    <div className="col-12 col-md-6 col-lg-6 col-xxl-4">
      {!singleCart.isCustomPizza ? (
        <div className="card mx-auto" style={{ width: "15rem" }}>
          <img src={singleCart.image} className="card-img-top" alt="..." />
          <div className="card-body ">
            <p className="card-text fs-5 fw-semibold m-0">{singleCart.name}</p>
            <div
              style={{ width: "100%" }}
              className="text-center d-flex align-items-center  gap-3 mt-2"
            >
              <p className="mb-2 fw-semibold">quantity</p>
              <select
                type="number"
                style={{ width: "30%" }}
                placeholder="Qty"
                value={quantity}
                onChange={(event) => setQuantity((prv) => event.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
          <div className="d-flex card-body align-items-center justify-content-between p-0 px-3 mb-2">
            <h4 className="text-center fs-5 fw-semibold">
              Price : Rs.{singleCart.price * singleCart.quantity}
            </h4>
            <i
              className="fa fa-trash text-danger"
              aria-hidden="true"
              style={{ cursor: "pointer" }}
              onClick={deleteTheItem}
            ></i>
          </div>
        </div>
      ) : (
        <div className="card mx-auto" style={{ width: "15rem" }}>
          <img
            src={
              "https://cdn.dribbble.com/users/311861/screenshots/2269929/custom_made.png"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body ">
            <p className="card-text fs-5 fw-semibold m-0">Custom Pizza</p>
          </div>
          <div className=" card-body p-0 px-3 mb-2">
            <h4 className="text-center fs-5 fw-semibold">
              {singleCart.pizzaBase}
            </h4>
            <h4 className="text-center fs-5 fw-semibold">
              {singleCart.pizzaSauce}
            </h4>
            <h4 className="text-center fs-5 fw-semibold">
              {singleCart.pizzaCheese}
            </h4>{" "}
            {/* <h4 className="text-center fs-5 fw-semibold">
              {singleCart.pizzaBase}
            </h4>{" "}
            <h4 className="text-center fs-5 fw-semibold">
              {singleCart.pizzaBase}
            </h4> */}
            <i
              className="fa fa-trash text-danger"
              aria-hidden="true"
              style={{ cursor: "pointer" }}
              onClick={deleteTheItem}
            ></i>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartSingleItem;
