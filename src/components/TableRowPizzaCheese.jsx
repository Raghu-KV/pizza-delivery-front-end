import { useState } from "react";
function TabelRowPizzaCheese({ data, deleteFunction }) {
  const [loading, setLoading] = useState(false);
  return (
    <tr>
      <td>{data.pizzaCheese}</td>
      <td>{data.price}</td>
      <td>{data.countInStock}</td>
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
          {!loading ? (
            <i
              className="fas fa-light fa-trash cursor-pointer"
              style={{ color: "#ab1c2a" }}
              onClick={() => {
                setLoading(true);
                deleteFunction(data.pizzaCheese);
              }}
            ></i>
          ) : (
            "Loading..."
          )}
        </button>
      </td>
    </tr>
  );
}

export default TabelRowPizzaCheese;