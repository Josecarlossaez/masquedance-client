// HOOKS
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listCartProductService } from "../services/user.services";
// CSS
import "../css/Cart/cart.css";
// ICONS
import deleteIcon from "../images/icons8-eliminar-64.png"
//  SERVICES
import { removeProductFromCartService } from "../services/user.services";

function Cart() {
  const navigate = useNavigate();

  // States
  const [isFetching, setIsFetching] = useState("");
  const [details, setDetails] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const initialQuantities = details.reduce((acc, item) => {
      acc[item._id] = 1;
      return acc;
    }, {});

    setQuantities(initialQuantities);
  }, [details]);
  const getData = async () => {
    try {
      const response = await listCartProductService();
      setDetails(response.data);
      console.log("response", response.data);
      setIsFetching(false);
    } catch (error) {}
  };

  // const handleQuantityChange = (productId, e) => {
  //   const { value } = e.target;
  //   setQuantities((prevQuantities) => ({
  //     ...prevQuantities,
  //     [productId]: parseInt(value),
  //   }));
  // };
  console.log("prevQuantities", quantities);
  const calculateSubtotal = (productId) => {
    const quantity = quantities[productId];
    const product = details.find((item) => item._id === productId);
    return quantity * product.price;
  };

  const calculateTotal = () => {
    const total = details.reduce((accumulator, item) => {
      const subtotal = calculateSubtotal(item._id);
      return accumulator + subtotal;
    }, 0);
   console.log("quantititels", quantities);
  
    return total;
  };
// Delete product from cart
  const handleDeleteProduct = async (id) => {
    console.log("id",id);
    try {
      await removeProductFromCartService(id)
      getData()
    } catch (error) {
      navigate("/error")
    }

  }
// hover into deleteButton



  if (isFetching === true) {
    return <p>LOading...</p>;
  }
  return (
    <div>
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>SubTotal</th>
          </tr>
        </thead>
        <tbody>
          {details.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.picture} alt="pic" />
              </td>
              <td>{item.name}, talla: {item.size}</td>
              <td>{item.price}</td>
              <td>
              {/* INICIO ARRAY CANTIDAD */}
                {/* <div>
                  <label htmlFor="quantity">Cantidad:</label>
                  <select
                    name="quantity"
                    onChange={(e) => handleQuantityChange(item._id, e)}
                  >
                    {Array.from({ length: 30 }, (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div> */}
                {/* FIN ARRAY CANTIDAD */}
                <div className="cart-quantity">
                  <div>
                    <button>+</button>
                  </div>
                  <div>
                    Cantidad: 
                  </div>
                  <div>
                    <button>-</button>
                  </div>
                </div>
              </td>
              <td>{calculateSubtotal(item._id)} €</td>
              <td>
              
              <img  onClick={() => handleDeleteProduct(item._id)}  className="delete-icon" src={deleteIcon} alt="delete-icon" /></td>
            </tr>
          ))}
        </tbody>
      </table>
      

      </div>
      <div>
        <h2>Total: {calculateTotal()} € sin Iva.</h2>
      </div>
    </div>
  );
}

export default Cart;
