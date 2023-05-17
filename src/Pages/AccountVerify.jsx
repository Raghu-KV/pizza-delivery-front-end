import { useParams } from "react-router-dom";
import { BACK_END_URL, FRONT_END_URL } from "../URL";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { inputUserId } from "../redux_reducers/userId";
import { useDispatch } from "react-redux";

function AccountVerify() {
  const dispatch = useDispatch();
  const [res, setRes] = useState({ message: "no" });
  const { id } = useParams();
  localStorage.setItem("userId", "id");
  const verifyUser = async () => {
    const responce = await fetch(`${BACK_END_URL}/accountVerify/${id}`, {
      method: "PUT",
    });
    const data = await responce.json();
    setRes(data);
  };

  useEffect(() => {
    verifyUser();
  }, []);
  console.log(res);

  if (res.message === "account verified successfully") {
    localStorage.setItem("token", res.token);
    localStorage.setItem("isAdmin", res.isAdmin);
    return (
      <div className="text-center">
        <h3>your account verified successfully</h3>
        <a href={`${FRONT_END_URL}`} className="p-1">
          HOME
        </a>
        <a href={`${FRONT_END_URL}/cart`} className="p-1">
          CART
        </a>
      </div>
    );
  } else if (res.message === "no") {
    return <div>LOADING...</div>;
  } else {
    return (
      <div className="text-center">
        <h3>your account verified failed{res.message}</h3>
      </div>
    );
  }
}

export default AccountVerify;
