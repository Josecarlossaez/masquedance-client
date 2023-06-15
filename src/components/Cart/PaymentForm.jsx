import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/paypal/paypalCheckoutButton.css";
import StripeCheckout from "../stripe/StripeCheckout";
import PaypalCheckoutButton from "../paypal/PaypalCheckoutButton";
import { Link } from "react-router-dom";

function PaymentForm(props) {
  
  const { orderToPayment } = props;
  console.log("pedido.prps", orderToPayment);

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

  // // Set order to send to backend
  const [newOrder, setNewOrder] = useState({});
  // const newOrderRef = useRef(newOrder);
  // newOrderRef.current = newOrder;

  useEffect(() => {
    setNewOrder({
      ...orderToPayment,
      address: addressInput,
      cp: cpInput,
      town: townInput,
      province: provinceInput,
      country: countryInput,
      name: nameInput,
    });
  }, [
    addressInput,
    cpInput,
    townInput,
    provinceInput,
    countryInput,
    nameInput,
    orderToPayment,
  ]);
  console.log("newOrder", newOrder);

  return (
    <div>
      <div className="form-data-container">
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
      <div>
      <div>
        <PaypalCheckoutButton newOrder={newOrder} />
      </div>
        <div>
        <StripeCheckout orderToPayment={newOrder} />
      </div>
      <div>
        <a href="/cart" >Volver</a>
      </div>
        
      </div>
      
    </div>
  );
}

export default PaymentForm;
