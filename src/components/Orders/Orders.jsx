import React from 'react'

// CSS
import "../../css/product/list-products.css"

// React
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// Services FIREBASE
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'

function Orders(props) {
    const {orders} = props
    const navigate = useNavigate();
     
    // States
    const [isFetching, setIsFetching] = useState(true);
    const [listOrders, setListOrders] = useState()
    const [searchInput, setSearchInput] = useState("");
    const [OrdersListSearch, setOrdersListSearch] = useState([]);





    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
       
    
            setListOrders(orders)
            setOrdersListSearch(orders)
  
        setIsFetching(false)
    }

    const filterOrders = (filterQuery) => {
        const filteredArr = listOrders.filter((eachOrder) => {
            return eachOrder.orderNumber.toString().includes(filterQuery.toString());
        });
        setOrdersListSearch(filteredArr);
    };

    // const copy = [...teamList]
    // setTeamListSearch(copy)

    const handleSearchChange = (event) => {
        setSearchInput(event.target.value);
        filterOrders(event.target.value);
    };

    if (isFetching === true) {
        return <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="sr-only"></span>
            </div>
        </div>
    }

    return (
        <div>
            <h1>Listado de Pedidos</h1>
            <div className="input-container" style={{width:"350px", margin:"auto", border:"solid 2px darkgrey"}}>
                <input style={{backgroundColor:"transparent"}}
                    value={searchInput}
                    onChange={handleSearchChange}
                />

                <label style={{backgroundColor:"transparent"}}
                    className={searchInput && "filled"}
                    htmlFor="Buscar"
                >
                    Buscar 
                </label>
            </div>
            <div className='products-container'>
                <table className='product-table'>
                    <thead>
                        <tr>
                            <th>Número de Pedido</th>
                            <th>Email</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {OrdersListSearch.map((eachOrder) => (
                            <tr key={eachOrder.id}>
                                <td>
                                    <Link to={`/orders/${eachOrder.id}/details`}>
                                        <h4 style={{fontSize:"14px"}}>{eachOrder.orderNumber} </h4>
                                    </Link>
                                </td>
                                <td>
                                    {eachOrder.email}
                                </td>
                                <td>{`${eachOrder.orderNumber.toString().slice(0, 4)}-${eachOrder.orderNumber.toString().slice(4, 6)}-${eachOrder.orderNumber.toString().slice(6, 8)} `}
                                </td>
                                <td>
                                    {eachOrder.state}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Orders