import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FRONT_END_URL } from "../URL";
function Header() {
  const token = localStorage.getItem("token");
  const cartLength = useSelector((state) => state.cart.value.length);

  const clearLocalItems = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
  };
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary sticky-top"
      data-bs-theme="dark"
    >
      <div className="container-fluid container">
        <Link className="navbar-brand " to={"/"}>
          PizzaD
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to={"/"}>
                Home
              </Link>
            </li>

            <li className="nav-item ">
              <Link className="nav-link" to={"/cart"}>
                <i className="fas fa-shopping-cart me-1"></i>
                Cart
                <span className="badge rounded-pill text-bg-light ms-2 d-inline-block mb-6">
                  {cartLength}
                </span>
              </Link>
            </li>

            {token ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Profile
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Your orders
                    </a>
                  </li>
                  <li onClick={clearLocalItems}>
                    <a className="dropdown-item" href={FRONT_END_URL}>
                      Log out
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to={"/signIn"}>
                  <i className="fas fa-user me-1"></i>
                  Sign In
                </Link>
              </li>
            )}
            {/* {token && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Profile
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Your orders
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            )} */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
