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
import { getDoc, collection, getDocs, doc } from "firebase/firestore";
import { db } from '../firebase'

// COMPONENTS

import PaypalCheckoutButton from "../components/paypal/PaypalCheckoutButton";



function Cart() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
 

  // States
  const [isFetching, setIsFetching] = useState("");
  const [cart, setCart] = useState([])
  const [details, setDetails] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [errorMessage, setErrorMessage] = useState("")
  const [orderToPayment, setOrderToPayment] = useState(null);
  const [userActive, setUserActive] = useState(null)
  // const [stockFail, setStockFail] = useState(false)

  useEffect(() => {
    getData();
  }, [user]);

  useEffect(() => {
    const initialQuantities = cart.reduce((acc, item) => {
      acc[item] = 1;
      return acc;
    }, {});

    setQuantities(initialQuantities);
  }, [cart]);

  

  const getData =  () => {
 
      setCart(user?.cart)
  };


  let order = details.map((item) => {
    const newItem = { ...item };
    newItem.cantidad = quantities[item._id];
    newItem.subtotal = quantities[item._id] * newItem.price;
    return newItem;
  })

  const handleQuantityChange = (productId, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: value,
    }));
  };

  console.log("prevQuantities", quantities);

  const calculateSubtotal = (productId) => {
    const quantity = quantities[productId];
    const product = cart.find((item) => item === productId);
    return quantity * product.price;
  };

  const calculateTotal = () => {
    const total = cart.reduce((accumulator, item) => {
      const subtotal = calculateSubtotal(item._id);
      return accumulator + subtotal;
    }, 0);
    console.log("quantititels", quantities);

    return total + 7;
  };
  // Delete product from cart
  const handleDeleteProduct = async (id) => {
    console.log("id", id);
   
  };

  const handleContinuarCompra = async () => {
    
    const order = details.map((item) => {
      const newItem = { ...item };
      newItem.cantidad = quantities[item._id];
      
      newItem.subtotal = quantities[item._id] * newItem.price;
      return newItem;
    });
   let stockFail = false;
    order.forEach((each) => {
      if(each.cantidad > each.stock){
        setErrorMessage(`Hay un problema con el producto ${each.name} talla:${each.size}, solamente quedan ${each.stock} en stock`)
        setTimeout(() => {
          setErrorMessage("")
        }, 2000);
        stockFail = true;
      }
    })
    
    
    console.log("stockFail", stockFail)
   if(stockFail === true) {

    return 
   }
    
    console.log("ha pasado el return");

    
  
    let total = order.reduce((accumulator, item) => {
      const subtotal = item.subtotal || 0; // Si subtotal es undefined, se establece como 0
      return accumulator + subtotal;
    }, 0);
     
    // Gastos de envío
    total = total +7
  
  
    
    console.log("pedido", order);
    const newOrder = {
      total: total,
      username: user.user.username,
      email: user.user.email,
      orderCart: order,
    };
    setOrderToPayment(newOrder);
    console.log("newOrder", newOrder);
    // Create Order
    // try {
    //   await createOrderService(newOrder)

    // } catch (error) {
    //   navigate("/error")
    // }
  };
  
  let divDisabled;
  !orderToPayment ? (divDisabled="table") : (divDisabled="disabled")
  
  if (isFetching === true) {
    return <p>LOading...</p>;
  }
  
  return (
    <div>
      <div>
        <table className={divDisabled}>
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
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.picture} alt="pic" />
                </td>
                <td>
                  {item.name}, talla: {item.sizeSelected}
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
                {/* <td>{calculateSubtotal(item._id)} €</td> */}
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
      {errorMessage !== "" && (
            <p className="error-message"> * {errorMessage}</p>
          )}
      <div>
        {/* <h2>Total: {calculateTotal()}€</h2> <p>{`( 7€ de gastos de envío)`}.</p> */}
       <div>
      <HashLink smooth to="#paypal-button-container"> 
        <button onClick={()=> handleContinuarCompra()} className="btn-bought">Continuar Compra</button>
        {/* {okMessage !== "" && <p className="ok-message"> * {okMessage}</p>} */}
      </HashLink>
      </div>
      </div>
      <hr />
     
      {orderToPayment !== null &&
      <div id="paypal-button-container">
        <PaypalCheckoutButton orderToPayment={orderToPayment} />
      </div>
      }
     
      
    </div>
  );
}

export default Cart;
