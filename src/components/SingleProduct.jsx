import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux_reducers/cart";
import { useState, useEffect } from "react";
import { BACK_END_URL } from "../URL";
import { useNavigate } from "react-router-dom";

function SingleProduct({ product, allProducts }) {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [toDelete, setToDelete] = useState("Delete");

  useEffect(() => {
    cart.map((item) => {
      if (item._id === product._id) {
        setIsButtonDisabled(true);
      }
    });
  }, [cart]);

  const getIsAdmin = localStorage.getItem("isAdmin");
  const isAdmin = JSON.parse(getIsAdmin);

  const addItemToCart = (product) => {
    const productWithQuantanty = { ...product, quantity: 1 };

    const cartLocalData = localStorage.getItem("cart");
    const verifyData = JSON.parse(cartLocalData);

    const newCartItems = [...verifyData, productWithQuantanty];
    localStorage.setItem("cart", JSON.stringify(newCartItems));
    dispatch(addToCart(newCartItems));
  };

  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    setToDelete("Loading...");
    await fetch(`${BACK_END_URL}/deleteProduct/${product._id}`, {
      method: "DELETE",
      headers: { "x-auth-token": token },
    });

    await allProducts();
  };

  const navigate = useNavigate();

  return (
    <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
      <div className="card mx-auto text-center" style={{ width: "18rem" }}>
        <img src={product.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title fw-bolder  fs-4">{product.name}</h5>
          <p className="card-text mb-0">
            One of the simplest and most traditional pizzas is the Margherita,
            which is topped with tomatoes or tomato sauce, mozzarella, and
            basil.
          </p>
          <p className="card-text fw-bolder my-2 fs-5">Rs.{product.price}</p>
          <button
            className="btn btn-primary"
            onClick={() => addItemToCart(product)}
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? "Added to Cart" : "Add to Cart"}
          </button>
          {isAdmin && (
            <div className="mt-1">
              <h5>remaing qty : {product.countInStock}</h5>
              <span
                role="button"
                className="badge text-bg-secondary me-1"
                onClick={() => navigate(`admin/editProduct/${product._id}`)}
              >
                Edit or Change qty
              </span>
              <span
                role="button"
                className="badge text-bg-danger ms-1"
                onClick={handleDelete}
              >
                {toDelete}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
