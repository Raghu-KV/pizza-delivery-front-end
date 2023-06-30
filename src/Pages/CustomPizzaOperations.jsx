import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

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
            {allPizzaBases.map((singlePizzaBase) => (
              <tr>
                <td>{singlePizzaBase.pizzaBase}</td>
                <td>{singlePizzaBase.price}</td>
                <td>{singlePizzaBase.countInStock}</td>
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
          Add pizza base
        </button>
      </div>
    </div>
  );
}

export default CustomPizzaOperations;
