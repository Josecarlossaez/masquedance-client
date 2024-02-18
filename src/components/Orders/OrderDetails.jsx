import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { db } from '../../firebase';
// CSS
import "../../css/orders/orderDetails.css"
import { AuthContext } from '../../context/auth.context';



function OrderDetails() {
    const { orderId } = useParams();
    const { isAdmin } = useContext(AuthContext)


    const [OrderDetails, setOrderDetails] = useState()
    const [isFetching, setIsFetching] = useState(true);
    const [date, setDate] = useState(new Date())


    useEffect(() => {
        getData();
    }, []);
    console.log("Pleas, la fecha de hoy -->", date);
    const getData = async () => {
        try {
            console.log("orderId", orderId)
            const product = doc(db, 'orders', orderId)
            const productById = await getDoc(product)
            setOrderDetails(productById.data())
            setIsFetching(false);
        } catch (error) {
            Navigate("/error");
        }
    };
    const handleUpdateOrder = async () => {
        try {
            const orderToUpdate = doc(db, "orders", orderId)
            await updateDoc(orderToUpdate, { 
                sent: date,
                state: "Enviado"
             })
            alert("Pedido actualizado correctamente")
            Navigate("/admin")

        } catch (error) {
            console.log(error)
            Navigate("/error")
        }

    }

    if (isFetching === true) {
        return <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="sr-only"></span>
            </div>
        </div>
    }
    return (
        <div className='order-details-container'>
            <div className="cart-container">
                <div className='order-header'>
                    <h4>Número de Pedido: <span class="order-number">{OrderDetails.orderNumber}</span></h4>
                    <h4>Pedido realizado el: <span class="order-date">{`${OrderDetails.orderNumber.toString().slice(6, 8)}-${OrderDetails.orderNumber.toString().slice(4, 6)}-${OrderDetails.orderNumber.toString().slice(0, 4)} `}</span></h4>
                    <h4>Estado del pedido: <span class="order-status">{OrderDetails.state}</span></h4>
                    {OrderDetails.sent !== "" &&
                        <h4> Fecha de envío: <span class="shipped-date">{OrderDetails.sent}</span> </h4>
                    }
                    <h2>Total: <span class="total-amount">{OrderDetails.total}€</span></h2> <p><span class="shipping-cost">( 7€ de gastos de envío)</span>.</p>

                    <h3>Detalles del pedido:</h3>
                </div>

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
                        {OrderDetails?.orderCart.map((item) => (
                            <tr key={item.eachId}>
                                <td>
                                    <img src={item.picture} alt="pic" />
                                </td>
                                <td>
                                    {item.name}{item.contieneTallas && <span>, talla: {item.sizeSelected}</span>}
                                </td>
                                <td>{item.price} €</td>
                                <td>{item.cantidad} </td>
                                <td>{item.subtotal} €</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <hr />

            {
                isAdmin && OrderDetails.sent ==="" &&
                <div className='date-selection'>
                    <label htmlFor="">Fecha</label>
                    <input type="date" onChange={e => setDate(e.target.value)} />
                    {/* <DatePicker selected={date} onChange={(date) => setDate(date)} /> */}
                    <button
                        type="submit"
                        onClick={handleUpdateOrder}
                        className="general-btn"
                    >
                        Marcar como enviado
                    </button>

                </div>
            }

        </div>
    )
}

export default OrderDetails