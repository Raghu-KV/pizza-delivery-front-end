import { useSelector } from "react-redux";
import CartSingleItem from "../components/CartSingleItem";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux_reducers/cart";
import { useNavigate } from "react-router-dom";
import { BACK_END_URL } from "../URL";

function Cart() {
  const cart = useSelector((state) => state.cart.value);

  const dispatch = useDispatch();

  useEffect(() => {
    const cartLocalData = localStorage.getItem("cart");
    const verifyData = JSON.parse(cartLocalData);

    const newCartItems = [...verifyData];
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    dispatch(addToCart(newCartItems));
  }, []);

  const allReadyMadePizza = cart.filter((cartItem) => !cartItem.isCustomPizza);

  const totalProductPrice = allReadyMadePizza.map(
    (singleCartItem) => singleCartItem.price * singleCartItem.quantity
  );
  console.log(cart, totalProductPrice);

  //CUSTOM PIZZA OPRATIONS___________________________________
  const customPizzaData = useSelector((state) => state.customPizza.value);
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

  console.log(cart);
  const allCustomPizzaInCart = cart.filter(
    (cartItem) => cartItem.isCustomPizza
  );

  const customPizzaPrice = [];

  allCustomPizzaInCart.map((singleCustomPizzaInCart) => {
    //finding the pizza base-------------
    allPizzaBases.filter((singlePizzaBase) => {
      if (singlePizzaBase.pizzaBase === singleCustomPizzaInCart.pizzaBase) {
        customPizzaPrice.push(singlePizzaBase);
      }
    });
    //---------------------------------
    //finding the pizza sauce-----------
    allPizzaSauces.filter((singlePizzaSauce) => {
      if (singlePizzaSauce.pizzaSauce === singleCustomPizzaInCart.pizzaSauce) {
        customPizzaPrice.push(singlePizzaSauce);
      }
    });
    //---------------------------------

    //finding the pizza cheese-----------
    allPizzaCheese.filter((singlePizzaCheese) => {
      if (
        singlePizzaCheese.pizzaCheese === singleCustomPizzaInCart.pizzaCheese
      ) {
        customPizzaPrice.push(singlePizzaCheese);
      }
    });
    //---------------------------------
    //finding the veggies price---------------
    // allVeggies.map((singlePizzaVeggies) => {
    //   if (singleCustomPizzaInCart.veggies.length > 0) {
    //     singleCustomPizzaInCart.veggies.map((singleVeggies) => {
    //       // for (let i = 0; i < singleCustomPizzaInCart.veggies.length; i++) {
    //       if (singleVeggies === singlePizzaVeggies.veggies) {
    //         customPizzaPrice.push(singlePizzaVeggies);
    //       }
    //     });
    //   }
    // });
    if (singleCustomPizzaInCart.veggies.length > 2) {
      for (let i = 0; i < allVeggies.length; i++) {
        for (let j = 2; j < singleCustomPizzaInCart.veggies.length; j++) {
          if (singleCustomPizzaInCart.veggies[j] === allVeggies[i].veggies) {
            customPizzaPrice.push(allVeggies[i]);
          }
        }
      }
    }
    //----------------------------------------

    //finding the meat price---------------
    // allMeat.map((singlePizzaMeat) => {
    //   if (singleCustomPizzaInCart.meat.length > 1) {
    //     singleCustomPizzaInCart.meat.map((singleMeat) => {
    //       if (singleMeat === singlePizzaMeat.meat) {
    //         customPizzaPrice.push(singlePizzaMeat);
    //       }
    //     });
    //   }
    // });
    if (singleCustomPizzaInCart.meat.length > 1) {
      for (let i = 0; i < allMeat.length; i++) {
        for (let j = 1; j < singleCustomPizzaInCart.meat.length; j++) {
          if (singleCustomPizzaInCart.meat[j] === allMeat[i].meat) {
            customPizzaPrice.push(allMeat[i]);
          }
        }
      }
    }
    //----------------------------------------
  });

  console.log(allCustomPizzaInCart, customPizzaPrice);
  let customPizzaRs = 0;
  customPizzaPrice.map((singleCustomPizzaPrice) => {
    customPizzaRs += singleCustomPizzaPrice.price;
  });
  console.log(customPizzaRs);
  //_________________________________________________________

  // total price for cart items --------------
  let price = 0;
  price += customPizzaRs;
  for (let i = 0; i < totalProductPrice.length; i++) {
    price += totalProductPrice[i];
  }
  console.log(price);
  // ----------------------------------

  //GST----------------------------------
  const percentageInPrice = (price * 5) / 100;
  const priceAfterTax = Math.round(price + percentageInPrice);
  //--------------------------------------

  //pay now function -----------------------
  const navigate = useNavigate();

  const initPayment = (data) => {
    const token = localStorage.getItem("token");
    const options = {
      key: "rzp_test_5ldscDerXOP0P0",
      amount: data.amount,
      currency: data.currency,
      name: "front end test name",
      //image:"needed"
      discription: "front end test discription",
      order_id: data.id,
      handler: async (responce) => {
        console.log(responce, "line 53");
        const toSendDataWithToken = { ...responce, token: token, cart: cart };
        const res = await fetch(`${BACK_END_URL}/razorpay/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(toSendDataWithToken),
        });
        const convertedRes = await res.json();
        console.log(convertedRes);
      },
      theme: "#023047",
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayNow = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("user in logged in we can proceeed", token);

      const responce = await fetch(`${BACK_END_URL}/razorpay/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart),
      });
      const paymentDetails = await responce.json();
      console.log(paymentDetails);

      initPayment(paymentDetails);
      //localStorage.removeItem("cart");
    } else {
      navigate("/signIn");
    }
  };

  if (cart.length > 0) {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-8">
          <div className="row g-4">
            {cart.map((singleCart) => (
              <CartSingleItem
                singleCart={singleCart}
                key={singleCart._id}
                customPizzaPrice={customPizzaPrice}
              />
            ))}
          </div>
        </div>

        <div className="col-sm-12 col-md-12 col-lg-4">
          <div className="mt-3 mx-3 px-3 rounded-4 text-center py-3 bg-primary-subtle">
            <h6>Net price : {price}</h6>
            <h6>GST @5% : {percentageInPrice}</h6>
            <h6>Total price : {priceAfterTax}</h6>
            <button
              type="button"
              className="btn btn-dark d-block"
              style={{ width: "100%" }}
              onClick={handlePayNow}
            >
              PAY NOW
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="text-center">No items in Cart</div>;
  }
}

export default Cart;
