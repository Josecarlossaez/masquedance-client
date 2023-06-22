import React, { useEffect, useRef } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrderService } from "../../services/order.services";
import "../../css/paypal/paypalCheckoutButton.css";
import StripeCheckout from "../stripe/StripeCheckout";
import { HashLink } from "react-router-hash-link";
import ConfirmOrder from "../Cart/ConfirmOrder";
import { updateStockProductService } from "../../services/product.services";

function PaypalCheckoutButton(props) {
  const navigate = useNavigate();
  const { orderToPayment } = props;
  console.log("pedido.prps", orderToPayment);

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // BUTTONS VIEW STATES
  const [paymentButtonsView, setPaymentButtonsView] = useState(false);
  const [stripeButtnView, setStripeButtonView] = useState(false);
  const [orderConfirmView, setOrderConfirmView] = useState(false)

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

  // Set order to send to backend
  const [newOrder, setNewOrder] = useState({});
  const newOrderRef = useRef(newOrder);
  newOrderRef.current = newOrder;

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
    paidFor,
  ]);
  console.log("newOrder", newOrder);
  
  const handleIrAPagar = () => {
    console.log("dentro de pagar", newOrder);
    if (
      newOrder.address === "" ||
      newOrder.name === "" ||
      newOrder.province === "" ||
      newOrder.town === "" ||
      newOrder.country === "" ||
      newOrder.cp === ""
    ) {
      setErrorMessage("Debe rellenar todos los campos");
      setTimeout(() => {
        setErrorMessage("");
      }, 1000);
      return;
      
    }
    setOrderConfirmView(true)
    // setPaymentButtonsView(true);
  };
  // Form will be disabled
  let formDataView;
  !orderConfirmView ? (formDataView="table") : (formDataView="disabled")
  

  const handleApprove = async (orderPaypalId) => {
    // Call Backend function to futfill order

    setPaidFor(true);

    try {
      // await createOrderService(newOrderRef.current);
      await updateStockProductService(newOrderRef.current);
      navigate("/");
    } catch (error) {
      navigate("/error");
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
    <div className="form-data-container">
      <div className={formDataView}>
        <div>
          <h4>Rellene los siguientes campos </h4>
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
      {errorMessage !== "" && (
        <p className="error-message"> * {errorMessage}</p>
      )}
      <div className="payment-buttons-container">
      {(!paymentButtonsView && !orderConfirmView)&&
      <div>
      <HashLink smooth to="#confirm-order">
         <button className="select-payment" onClick={handleIrAPagar}>
            Revisar Pedido
          </button>
      </HashLink>
         
        </div>
      }
      
      
        {orderConfirmView &&
        <ConfirmOrder newOrder={newOrderRef.current} setPaymentButtonsView={setPaymentButtonsView} /> }
        {paymentButtonsView && (
          <div>
        
            <div style={{ position: "relative" }}>
              <PayPalButtons
                className="paypalButtons"
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
                          value: parseFloat(orderToPayment.total).toFixed(2),
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
            <div className="credit-card-btn">
              <HashLink smooth to="#stripe-element">
                <button onClick={() => setStripeButtonView(!stripeButtnView)}>
                  Credit Card
                </button>
              </HashLink>
            </div>
          </div>
        )}

        {stripeButtnView && (
          <div>
            <StripeCheckout
              newOrder={newOrder}
              setErrorMessage={setErrorMessage}
            />
          </div>
        )}
        <div className="volver-btn">
          <a href="/cart">
            <button>Volver al carrito</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default PaypalCheckoutButton;
