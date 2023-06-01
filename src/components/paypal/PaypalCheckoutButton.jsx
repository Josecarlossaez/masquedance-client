import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrderService } from "../../services/order.services";

function PaypalCheckoutButton(props) {
  const navigate = useNavigate()
  const { orderToPaypal } = props;
  console.log("pedido.prps", orderToPaypal);

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
 

  // FORM STATES
  const [nameInput, setNameInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [cpInput, setCpInput] = useState("");
  const [townInput, setTownInput] = useState("");
  const [provinceInput, setProvinceInput] = useState("");
  const [countryInput, setCountryInput] = useState("");

  // take user´s address info
  const handleNameChange = (e) => setNameInput(e.target.value);
  const handleAddressChange = (e) => setAddressInput(e.target.value);
  const handleCpChange = (e) => setCpInput(e.target.value);
  const handleTownChange = (e) => setTownInput(e.target.value);
  const handleProvinceChange = (e) => setProvinceInput(e.target.value);
  const handleCountryChange = (e) => setCountryInput(e.target.value);

  const handleApprove = async (orderPaypalId) => {
    // Call Backend function to futfill order

    setPaidFor(true);
    const newOrder = {
     
      total:   orderToPaypal.total,
      email: orderToPaypal.email,
      name : nameInput,
      address: addressInput,
      cp : cpInput,
      town : townInput,
      province : provinceInput,
      country : countryInput,
      orderCart: orderToPaypal.orderCart
    }
  
    console.log("register Order in DB", newOrder);
    try {
      await createOrderService(newOrder)
      navigate("/")
      
    } catch (error) {
      navigate("/error")
    }
  };
  if (paidFor) {
    //Display succes message
    // alert("your payment was ")
    alert("Thank you for your purchase!");
  }
  if (error) {
    // display errorMessage
  }

  return (
    <div>
      <div>
      <div>
        <h4>Rellene los siguientes campos y seleccione un método de pago</h4>
      </div>
        {/* FORM DATA TO ORDER */}
        <div className="input-container">
          <input value={nameInput} onChange={handleNameChange} />
          <label className={nameInput && "filled"} htmlFor="name">
            Nombre y apellidos
          </label>
        </div>
        {/*  */}
        <div className="input-container">
          <input value={addressInput} onChange={handleAddressChange} />
          <label className={addressInput && "filled"} htmlFor="name">
            Dirección completa
          </label>
        </div>
        {/*  */}
        <div>
          <div className="input-container">
            <input value={townInput} onChange={handleTownChange} />
            <label className={townInput && "filled"} htmlFor="name">
              Ciudad
            </label>
          </div>
          {/*  */}
          <div className="input-container">
            <input value={cpInput} onChange={handleCpChange} />
            <label className={cpInput && "filled"} htmlFor="name">
              Código Postal
            </label>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="input-container">
            <input value={provinceInput} onChange={handleProvinceChange} />
            <label className={provinceInput && "filled"} htmlFor="name">
              Provincia
            </label>
          </div>
          {/*  */}
          <div className="input-container">
            <input value={countryInput} onChange={handleCountryChange} />
            <label className={countryInput && "filled"} htmlFor="name">
              País
            </label>
          </div>
        </div>
          {/*  */}
      </div>

      <div style={{ position: "relative" }}>
        <PayPalButtons
          style={{
            color: "silver",
            layout: "horizontal",
            height: 48,
            tagline: false,
            shape: "pill",
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  reference_id: "default",
                  amount: {
                    currency_code: "USD",
                    value: parseFloat(orderToPaypal.total).toFixed(2),
                  },
                },
              ],
            });
          }}
          onClick={(data, actions) => {
            // validate on button click, client or server side
            const hasAlreadyBoughtCourse = false;
            if (hasAlreadyBoughtCourse) {
              setError(
                "You already bought this course. Go to your account to view your list of courses"
              );
              return actions.reject();
            } else {
              return actions.resolve();
            }
          }}
          onApprove={async (data, actions) => {
            const orderPaypal = await actions.order.capture();
            console.log("orderPaypal", orderPaypal);

            handleApprove(data.orderID);
          }}
          onCancel={() => {
            //Display cancel message, modal or redirect user to cancel page o redirect to cart
          }}
          onError={(err) => {
            setError(err);
            console.log("Paypal Checkout onError", err);
          }}
        />
        <style>{`
      .paypal-buttons .paypal-button-container:not(:first-child) {
        display: none;
      }
    `}</style>
      </div>
    </div>
  );
}

export default PaypalCheckoutButton;
