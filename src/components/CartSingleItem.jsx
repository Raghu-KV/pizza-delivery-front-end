import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromCart } from "../redux_reducers/cart";
import { changeQuantity } from "../redux_reducers/cart";
import { useState, useEffect } from "react";

function CartSingleItem({ singleCart, customPizzaPrice }) {
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

  const deleteTheCustomItem = () => {
    const localStoredCart = localStorage.getItem("cart");
    const parsedlocalStoredCart = JSON.parse(localStoredCart);
    const newCartData = parsedlocalStoredCart.filter(
      (data) => data.customId !== singleCart.customId
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
      if (data._id === changedQty._id && !data.isCustomPizza) {
        data.quantity = changedQty.quantity;
      }
    });

    localStorage.setItem("cart", JSON.stringify(parsedlocalStoredCart));
    // console.log("after map :", changedQty.quantity);
    // console.log("after map :", parsedlocalStoredCart);
  }, [quantity]);
  // price for costom pizza
  let totalPriceForUnit = 0;
  const singleCustomPizzaPrice = [];

  //find price for custom pizza seperate items------------------------
  const customPizzaData = useSelector((state) => state.customPizza.value);
  if (singleCart.isCustomPizza) {
    console.log(customPizzaData);
    const [
      allPizzaBasesObj,
      allPizzaSaucesObj,
      allPizzaCheeseObj,
      allVeggiesObj,
      allMeatObj,
    ] = customPizzaData;

    const { allPizzaBases } = allPizzaBasesObj;

    const { allPizzaSauces } = allPizzaSaucesObj;

    const { allPizzaCheese } = allPizzaCheeseObj;

    const { allVeggies } = allVeggiesObj;

    const { allMeat } = allMeatObj;

    //finding the pizza base-------------
    allPizzaBases.filter((singlePizzaBase) => {
      if (singlePizzaBase.pizzaBase === singleCart.pizzaBase) {
        singleCustomPizzaPrice.push(singlePizzaBase);
      }
    });
    //---------------------------------
    //finding the pizza sauce-----------
    allPizzaSauces.filter((singlePizzaSauce) => {
      if (singlePizzaSauce.pizzaSauce === singleCart.pizzaSauce) {
        singleCustomPizzaPrice.push(singlePizzaSauce);
      }
    });
    //---------------------------------

    //finding the pizza cheese-----------
    allPizzaCheese.filter((singlePizzaCheese) => {
      if (singlePizzaCheese.pizzaCheese === singleCart.pizzaCheese) {
        singleCustomPizzaPrice.push(singlePizzaCheese);
      }
    });
    //---------------------------------

    if (singleCart.veggies.length > 2) {
      for (let i = 0; i < allVeggies.length; i++) {
        for (let j = 2; j < singleCart.veggies.length; j++) {
          if (singleCart.veggies[j] === allVeggies[i].veggies) {
            singleCustomPizzaPrice.push(allVeggies[i]);
          }
        }
      }

      //----------------------------------------

      if (singleCart.meat.length > 1) {
        for (let i = 0; i < allMeat.length; i++) {
          for (let j = 1; j < singleCart.meat.length; j++) {
            if (singleCart.meat[j] === allMeat[i].meat) {
              singleCustomPizzaPrice.push(allMeat[i]);
            }
          }
        }
      }
      //----------------------------------------
    }

    for (let i = 0; i < singleCustomPizzaPrice.length; i++) {
      totalPriceForUnit += singleCustomPizzaPrice[i].price;
    }
    console.log(totalPriceForUnit, singleCustomPizzaPrice);
  }
  //------------------------------------------------------------------

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
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${singleCart.customId}`}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Pizza Items
                </button>
              </h2>
              <div
                id={singleCart.customId}
                class="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <p className="mb-1">{singleCart.pizzaBase} </p>
                  <p className="mb-1">{singleCart.pizzaSauce} </p>
                  <p className="mb-1">{singleCart.pizzaCheese} </p>
                  <p className="mb-1 fst-italic fw-semibold">Veggies :</p>
                  {(() => {
                    const veggiesData = [];
                    for (let i = 0; i < singleCart.veggies.length; i++) {
                      veggiesData.push(
                        <p className="mb-1">{singleCart.veggies[i]} </p>
                      );
                    }
                    return veggiesData;
                  })()}
                  {singleCart.meat.length > 0 && (
                    <p className="mb-1 fst-italic fw-semibold">Meat :</p>
                  )}
                  {singleCart.meat &&
                    (() => {
                      const meatData = [];
                      for (let i = 0; i < singleCart.meat.length; i++) {
                        meatData.push(
                          <p className="mb-1">{singleCart.meat[i]}</p>
                        );
                      }
                      return meatData;
                    })()}
                </div>
              </div>
            </div>
          </div>
          <div className=" card-body p-0 px-3 mb-2 d-flex justify-content-between align-items-center">
            <h4 className="text-center fs-5 fw-semibold">
              Price : {totalPriceForUnit}
            </h4>
            <i
              className="fa fa-trash text-danger"
              aria-hidden="true"
              style={{ cursor: "pointer" }}
              onClick={deleteTheCustomItem}
            ></i>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartSingleItem;
