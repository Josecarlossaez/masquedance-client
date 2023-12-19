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
  const [quantities, setQuantities] = useState([]);
  const [prevQuantities, setPrevQuantities] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const [orderToPayment, setOrderToPayment] = useState(null);
  const [userActive, setUserActive] = useState(null)
  // const [stockFail, setStockFail] = useState(false)

  useEffect(() => {
    getData();
  }, [user]);

  useEffect( () => {
    // chargeQuantities()

   const initialQuantities = cart.map((each,index) => ({
    ...each,
    cantidad:1,
    eachId: index
   }))
  
    setQuantities(initialQuantities);
    setPrevQuantities(initialQuantities);
  }, [cart]);

  const getData =  () => {
 
      setCart(user?.cart)
  };


  let order = cart.map((item) => {
    const newItem = { ...item };
    newItem.cantidad = quantities[item.cantidad];
    newItem.subtotal = quantities[item.cantidad] * newItem.price;
    return newItem;
  })

  const handleQuantityChange = (eachId, value) => {
    console.log("eachId", eachId)
    console.log("value", value);
  setQuantities((prevQuantities)=>
  prevQuantities.map((item) => ({
    ...item,
    cantidad: item.eachId === eachId ? value : item.cantidad
  }))
  )
  };


  const calculateSubtotal = (eachId) => {
    const quantity = quantities[eachId].cantidad;
    const product = quantities.find((item) => item.eachId === eachId);
    return quantity * product.price;
  };

  const calculateTotal = () => {
    const total = quantities.reduce((accumulator, item) => {
      const subtotal = calculateSubtotal(item.eachId);
      return accumulator + subtotal;
    }, 0);
    console.log("quantititels", quantities);

    return total + 7;
  };
  // Delete product from cart
  const handleDeleteProduct = async (id) => {
    
   
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
        setErrorMessage(`Hay un problema con el producto ${each.name} talla:${each.sizeSelected}, solamente quedan ${each.stock} en stock`)
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
            {quantities?.map((item) => (
              <tr key={item.eachId}>
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
                          item.eachId,
                          quantities[item.eachId].cantidad - 1 < 1
                            ? 1
                            : quantities[item.eachId].cantidad - 1
                        )
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantities[item.eachId].cantidad }
                      readOnly
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(item.eachId, quantities[item.eachId].cantidad + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{calculateSubtotal(item.eachId)} €</td>
                <td>
                  <img
                    onClick={() => handleDeleteProduct(item.eachId)}
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
        <h2>Total: {calculateTotal()}€</h2> <p>{`( 7€ de gastos de envío)`}.</p>
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
