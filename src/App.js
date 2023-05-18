// package import___________________________
import { Routes, Route } from "react-router-dom";

// component import_________________________
import Footer from "./components/Footer";
import Header from "./components/Header";

// imports of pages__________________________
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import SignIn from "./Pages/SignIn";
import Register from "./Pages/Register";
import AccountVerify from "./Pages/AccountVerify";
import ForgetPassword from "./Pages/ForgetPassword";
import AccountRecovery from "./Pages/AccountRecovery";
import Orders from "./Pages/Orders";
import AddProduct from "./Pages/AddProduct";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/accountVerify/:id" element={<AccountVerify />} />
            <Route
              path="/accountRecovery/:id/:token"
              element={<AccountRecovery />}
            />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/addProduct" element={<AddProduct />} />
          </Routes>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default App;
