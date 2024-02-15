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
import { getDoc, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase'

// COMPONENTS

import PaypalCheckoutButton from "../components/paypal/PaypalCheckoutButton";
import { Link } from "react-router-dom";



function Cart() {
  const navigate = useNavigate();
  const { user, getUserData } = useContext(AuthContext);

  let divDisabled;

  // States
  const [isFetching, setIsFetching] = useState(false);
  const [cart, setCart] = useState([])
  const [quantities, setQuantities] = useState([]);
  const [errorMessage, setErrorMessage] = useState("")
  const [orderToPayment, setOrderToPayment] = useState(null);
  const [order, setOrder] = useState([])
  const [userActive, setUserActive] = useState(null)
  const [stockFail, setStockFail] = useState(false)
  const [productToVerifyStock, setProductToVerifyStock] = useState({})

  useEffect(() => {
    getUserDataCart();
  }, []);



  useEffect(() => {
    if (quantities.length === 0) {

      const initialQuantities = cart?.map((each, index) => ({
        ...each,
        eachId: index
      }))

      setQuantities(initialQuantities);
    }
  }, [cart]);

  // const getData = () => {

  //   setCart(user?.cart)
  // };

  const getUserDataCart = async () => {
    try {
      const userDoc = await getDoc(doc(db, "users", user.id));
      const userData = userDoc.data();
      console.log("actualizado carrito", userData.cart);
      // Actualiza solo el carrito en el estado local
      setCart(userData.cart || []);
  
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }
  };

  // let order = cart?.map((item) => {
  //   const newItem = { ...item };
  //   newItem.cantidad = quantities[item.cantidad];
  //   newItem.subtotal = quantities[item.cantidad] * newItem.price;
  //   return newItem;
  // })
  // * FUNCTION TO CHANGE THE ITEM QUANTITY
  const handleQuantityChange = async (eachId, value) => {
    console.log("eachId", eachId)
    console.log("value", value);
    try {
      const updatedQuantities = quantities.map((item) => ({
        ...item,
        cantidad: item.eachId === eachId ? value : item.cantidad
      }))
      setQuantities(updatedQuantities)

      const userToUpdateQuantity = doc(db, "users", user.id)
      await updateDoc(userToUpdateQuantity, { cart: updatedQuantities })
      console.log("cantidad actualizada");
      getUserDataCart()
    } catch (error) {
      console.log("error dentro de handleQuantityChange", error)
    }
  };

  
  // * CALCULATE SUBTOTAL
  const calculateSubtotal = (eachId) => {
    const quantity = quantities[eachId].cantidad;
    const product = quantities.find((item) => item.eachId === eachId);
    return quantity * product.price;
  };

  // * CALCULATE TOTAL
  const calculateTotal = () => {
    const total = quantities.reduce((accumulator, item) => {
      const subtotal = calculateSubtotal(item.eachId);
      return accumulator + subtotal;
    }, 0);
    console.log("quantititels", quantities);
    return total + 7;
  };


  //* Delete product from cart
  const handleDeleteProduct = async (eachId) => {
    console.log("quantities en la función delete", quantities);
    const arrayToDeleteProduct = [...quantities]
    arrayToDeleteProduct.splice(eachId, 1)
    try {
      const userToUpdate = doc(db, "users", user.id)
      await updateDoc(userToUpdate, { cart: arrayToDeleteProduct })
      console.log("ha salido bien la borrada, ahora toca refrescar el carro del usuario")
      getUserData()
    } catch (error) {
      console.log(error)
    }
  };

  // * CONFIRM BOUGHT
  const handleContinuarCompra = async () => {
    let stockFail = false;
    let order;
    try {
      order = await Promise.all(
        quantities.map(async (item) => {
          const product = doc(db, "products", item.id);
          const productById = await getDoc(product);
          setProductToVerifyStock(productById.data());
          console.log("item", item);
          console.log("productToVerifyStock", productById.data());
  
          if (item.contieneTallas === true) {
            productById.data().size.forEach((eachSize) => {
              if (eachSize.name === item.sizeSelected) {
                if (eachSize.stock < item.cantidad) {
                  stockFail = true;
                  setStockFail(true);
                  alert(
                    `El producto ${item.name}, talla: ${item.sizeSelected}, tiene un stock máximo de ${eachSize.stock} unidades.`
                  );
                }
              }
            });
          }
  
          if (item.contieneTallas === false) {
            if (productById.data().stock < item.cantidad) {
              console.log("entrando en el if de contieneTallas === false");
              stockFail = true;
              setStockFail(true);
              alert(
                `El producto ${item.name}, tiene un stock máximo de ${item.stock} unidades.`
              );
              setIsFetching(false);
            }
          }
  
          const newItem = { ...item };
          newItem.subtotal = item.cantidad * item.price;
          return newItem;
        })
        );
        
        
        console.log("stockFail justo antes del return", stockFail);
        if (stockFail) {
          return;
        }
        
        console.log("order dentro de continuarCompra", order);
        
        
      } catch (error) {
        // Manejar errores, si es necesario
      console.error("Error al procesar las cantidades", error);
    }
    console.log("ha pasado el return");


    // * TOTAL WHEN CONFIRMATION IS TRUE
    let total = order.reduce((accumulator, item) => {
      const subtotal = item.subtotal || 0; // Si subtotal es undefined, se establece como 0
      return accumulator + subtotal;
    }, 0);
    // Gastos de envío
    total = total + 7

    // * ORDER OBJECT CREATION
    console.log("pedido", order);
    const newOrder = {
      total: total,
      email: user.email,
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
  !orderToPayment ? (divDisabled = "table") : (divDisabled = "disabled")
  
  console.log("divDisabled",divDisabled);
  console.log("orderToPayment",orderToPayment);
  

  if (isFetching === true) {
    return <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
  }

  return (

    <div>
          {cart.length === 0 ? ( 
            <div>
            <h2> Todavía no tienes productos en el carrito</h2>
            <Link to="/list-colections">Pincha aquí para conocer nuestro <span>MERCHANDISING</span></Link>
            </div>
            
            ) : (
 <div>
    <div className="cart-container">
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
                  {item.name}{item.contieneTallas && <span>, talla: {item.sizeSelected}</span>}
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
                      value={quantities[item.eachId].cantidad}
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
            <button onClick={() => handleContinuarCompra()} className="btn-bought">Continuar Compra</button>
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
   )}
    </div>



  );
}

export default Cart;
