// HOOKS
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listCartProductService } from "../services/user.services";
import { HashLink } from "react-router-hash-link";

// Context
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

// CSS
import "../css/Cart/cart.css";
// ICONS
import deleteIcon from "../images/icons8-eliminar-64.png";
//  SERVICES
import { removeProductFromCartService } from "../services/user.services";
import { createOrderService } from "../services/order.services";
// COMPONENTS
import PaypalCheckoutButton from "../components/paypal/PaypalCheckoutButton";
import StripeCheckout from "../components/stripe/StripeCheckout";


function Cart() {

  const navigate = useNavigate();
  const {user} = useContext(AuthContext)
  console.log(user);

  // States
  const [isFetching, setIsFetching] = useState("");
  const [details, setDetails] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [okMessage, setOkMessage] = useState("")
  const [orderToPayment, setOrderToPayment] = useState(null)

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
    } catch (error) {
      navigate("/error")
    }
  };

  // let order = details.map((item) => {
  //   const newItem = { ...item };
  //   newItem.cantidad = quantities[item._id];
  //   newItem.subtotal = quantities[item._id] * newItem.price;
  //   return newItem;
  // })

  const handleQuantityChange = (productId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: value,
    }));
  };
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
    console.log("id", id);
    try {
      await removeProductFromCartService(id);
      getData();
    } catch (error) {
      navigate("/error");
    }
  };
  const handleContinuarCompra = async () => {
     const order = details.map((item) => {
      const newItem = { ...item };
      newItem.cantidad = quantities[item._id];
      newItem.subtotal = quantities[item._id] * newItem.price;
      return newItem;
     
     
    });
    
  
    const total = order.reduce((accumulator, item) => {
      const subtotal = item.subtotal || 0; // Si subtotal es undefined, se establece como 0
      return accumulator + subtotal;
    }, 0);
  
  
    
    console.log("pedido", order);
    const newOrder = {
      total: total,
      username: user.user.username,
      email: user.user.email,
      orderCart: order,
    }
    setOrderToPayment(newOrder)
    console.log("newOrder", newOrder)
   // Create Order
    // try {
    //   await createOrderService(newOrder)
      
    
      
    // } catch (error) {
    //   navigate("/error")
    // }
  };
  
  
  
  if (isFetching === true) {
    return <p>LOading...</p>;
  }
  // TODO 1. Crear componente dirección de envío etc para hacer collapse al continuar compra
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
                <td>
                  {item.name}, talla: {item.size}
                </td>
                <td>{item.price} €</td>
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
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item._id,
                          quantities[item._id] - 1 < 1
                            ? 1
                            : quantities[item._id] - 1
                        )
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantities[item._id]}
                      readOnly
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, quantities[item._id] + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{calculateSubtotal(item._id)} €</td>
                <td>
                  <img
                    onClick={() => handleDeleteProduct(item._id)}
                    className="delete-icon"
                    src={deleteIcon}
                    alt="delete-icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Total: {calculateTotal()} € sin Iva.</h2>
      </div>
      <hr />
      <div>
      <HashLink smooth to="#paypal-button-container"> 
        <button onClick={()=> handleContinuarCompra()} className="btn-bought">Continuar Compra</button>
        {/* {okMessage !== "" && <p className="ok-message"> * {okMessage}</p>} */}
      </HashLink>
      </div>
      {orderToPayment !== null &&
      <div id="paypal-button-container">
        <PaypalCheckoutButton orderToPayment={orderToPayment} />
      </div>
      }
      
    </div>
  );
}

export default Cart;
