import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { BACK_END_URL } from "../URL";
import { useDispatch } from "react-redux";
import { addCustomPizzaData } from "../redux_reducers/customPizza";

function CustomPizzaOperations() {
  const customPizzaData = useSelector((state) => state.customPizza.value);

  const [allPizzaBases, setAllPizzaBases] = useState([]);
  const [allPizzaSauces, setAllPizzaSauces] = useState([]);
  const [allPizzaCheese, setAllPizzaCheese] = useState([]);
  const [allVeggies, setAllVeggies] = useState([]);
  const [allMeat, setAllMeat] = useState([]);

  useEffect(() => {
    if (customPizzaData.length !== 0) {
      const [
        allPizzaBasesObj,
        allPizzaSaucesObj,
        allPizzaCheeseObj,
        allVeggiesObj,
        allMeatObj,
      ] = customPizzaData;

      const { allPizzaBases } = allPizzaBasesObj;
      setAllPizzaBases(allPizzaBases);
      const { allPizzaSauces } = allPizzaSaucesObj;
      setAllPizzaSauces(allPizzaSauces);
      const { allPizzaCheese } = allPizzaCheeseObj;
      setAllPizzaCheese(allPizzaCheese);
      const { allVeggies } = allVeggiesObj;
      setAllVeggies(allVeggies);
      const { allMeat } = allMeatObj;
      setAllMeat(allMeat);
    }
  }, [customPizzaData]);

  const dispatch = useDispatch();

  const customPizza = async () => {
    const responce = await fetch(`${BACK_END_URL}/customPizza`);
    const data = await responce.json();
    console.log(data);

    dispatch(addCustomPizzaData(data));
  };

  const token = localStorage.getItem("token");

  const deletePizzaBase = async (data) => {
    const pizzaBaseName = { pizzaBaseName: data };
    console.log(pizzaBaseName);
    const responce = await fetch(`${BACK_END_URL}/deleteCustomBase`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-auth-token": token },
      body: JSON.stringify(pizzaBaseName),
    });
    customPizza();
  };

  return (
    <div>
      <div className="table-responsive">
        <h3 className="h2">Pizza Base</h3>
        <table className="table table-hover table-striped mt-4">
          <thead className=" bg-dark text-white">
            <th scope="col" className="ps-2 pt-2 pb-2">
              Pizza Base
            </th>
            <th scope="col" className="pt-2 pb-2">
              Price
            </th>
            <th scope="col" className="pt-2 pb-2">
              Stock
            </th>
            <th scope="col" className="pt-2 pb-2">
              Edit
            </th>
            <th scope="col" className="pt-2 pb-2">
              Delete
            </th>
          </thead>
          <tbody>
            {allPizzaBases.map((singlePizzaBase) => {
              return (
                <tr>
                  <td>{singlePizzaBase.pizzaBase}</td>
                  <td>{singlePizzaBase.price}</td>
                  <td>{singlePizzaBase.countInStock}</td>
                  <td>
                    {" "}
                    <button className="btn">
                      <i
                        className="fas fa-thin fa-pen-to-square cursor-pointer"
                        style={{ color: "#4046f2" }}
                      ></i>
                    </button>
                  </td>
                  <td>
                    <button className="btn">
                      <i
                        className="fas fa-light fa-trash cursor-pointer"
                        style={{ color: "#ab1c2a" }}
                        onClick={() =>
                          deletePizzaBase(singlePizzaBase.pizzaBase)
                        }
                      ></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className="btn btn-primary" type="button">
          <i className="fas fa-solid fa-plus me-2"></i>
          Add pizza base
        </button>
      </div>

      <div className="table-responsive mt-5">
        <h3 className="h2">Pizza Sauces</h3>
        <table className="table table-hover table-striped mt-4">
          <thead className=" bg-dark text-white">
            <th scope="col" className="ps-2 pt-2 pb-2">
              Pizza Sauces
            </th>
            <th scope="col" className="pt-2 pb-2">
              Price
            </th>
            <th scope="col" className="pt-2 pb-2">
              Stock
            </th>
            <th scope="col" className="pt-2 pb-2">
              Edit
            </th>
            <th scope="col" className="pt-2 pb-2">
              Delete
            </th>
          </thead>
          <tbody>
            {allPizzaSauces.map((data) => (
              <tr>
                <td>{data.pizzaSauce}</td>
                <td>{data.price}</td>
                <td>{data.countInStock}</td>
                <td>
                  {" "}
                  <i
                    className="fas fa-thin fa-pen-to-square"
                    style={{ color: "#4046f2" }}
                  ></i>
                </td>
                <td>
                  <i
                    className="fas fa-light fa-trash"
                    style={{ color: "#ab1c2a" }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary" type="button">
          <i className="fas fa-solid fa-plus me-2"></i>
          Add pizza sauce
        </button>
      </div>

      <div className="table-responsive mt-5">
        <h3 className="h2">Pizza Cheese</h3>
        <table className="table table-hover table-striped mt-4">
          <thead className=" bg-dark text-white">
            <th scope="col" className="ps-2 pt-2 pb-2">
              Pizza Cheese
            </th>
            <th scope="col" className="pt-2 pb-2">
              Price
            </th>
            <th scope="col" className="pt-2 pb-2">
              Stock
            </th>
            <th scope="col" className="pt-2 pb-2">
              Edit
            </th>
            <th scope="col" className="pt-2 pb-2">
              Delete
            </th>
          </thead>
          <tbody>
            {allPizzaCheese.map((data) => (
              <tr>
                <td>{data.pizzaCheese}</td>
                <td>{data.price}</td>
                <td>{data.countInStock}</td>
                <td>
                  {" "}
                  <i
                    className="fas fa-thin fa-pen-to-square"
                    style={{ color: "#4046f2" }}
                  ></i>
                </td>
                <td>
                  <i
                    className="fas fa-light fa-trash"
                    style={{ color: "#ab1c2a" }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary" type="button">
          <i className="fas fa-solid fa-plus me-2"></i>
          Add pizza cheese
        </button>
      </div>

      <div className="table-responsive mt-5">
        <h3 className="h2">Pizza Veggies</h3>
        <table className="table table-hover table-striped mt-4">
          <thead className=" bg-dark text-white">
            <th scope="col" className="ps-2 pt-2 pb-2">
              Pizza Veggies
            </th>
            <th scope="col" className="pt-2 pb-2">
              Price
            </th>
            <th scope="col" className="pt-2 pb-2">
              Stock
            </th>
            <th scope="col" className="pt-2 pb-2">
              Edit
            </th>
            <th scope="col" className="pt-2 pb-2">
              Delete
            </th>
          </thead>
          <tbody>
            {allVeggies.map((data) => (
              <tr>
                <td>{data.veggies}</td>
                <td>{data.price}</td>
                <td>{data.countInStock}</td>
                <td>
                  {" "}
                  <i
                    className="fas fa-thin fa-pen-to-square"
                    style={{ color: "#4046f2" }}
                  ></i>
                </td>
                <td>
                  <i
                    className="fas fa-light fa-trash"
                    style={{ color: "#ab1c2a" }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary" type="button">
          <i className="fas fa-solid fa-plus me-2"></i>
          Add pizza cheese
        </button>
      </div>

      <div className="table-responsive mt-5">
        <h3 className="h2">Pizza Meat</h3>
        <table className="table table-hover table-striped mt-4">
          <thead className=" bg-dark text-white">
            <th scope="col" className="ps-2 pt-2 pb-2">
              Pizza Meat
            </th>
            <th scope="col" className="pt-2 pb-2">
              Price
            </th>
            <th scope="col" className="pt-2 pb-2">
              Stock
            </th>
            <th scope="col" className="pt-2 pb-2">
              Edit
            </th>
            <th scope="col" className="pt-2 pb-2">
              Delete
            </th>
          </thead>
          <tbody>
            {allMeat.map((data) => (
              <tr>
                <td>{data.meat}</td>
                <td>{data.price}</td>
                <td>{data.countInStock}</td>
                <td>
                  {" "}
                  <i
                    className="fas fa-thin fa-pen-to-square"
                    style={{ color: "#4046f2" }}
                  ></i>
                </td>
                <td>
                  <i
                    className="fas fa-light fa-trash"
                    style={{ color: "#ab1c2a" }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-primary" type="button">
          <i className="fas fa-solid fa-plus me-2"></i>
          Add pizza cheese
        </button>
      </div>
    </div>
  );
}

export default CustomPizzaOperations;
