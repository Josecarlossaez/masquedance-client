import React from 'react'
// CSS
import "../../css/product/list-products.css"

// React
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// Services FIREBASE
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'


function ListProducts() {
  const navigate = useNavigate();

  // States
  const [isFetching, setIsFetching] = useState(true);
  const [listProduct, setListProduct] = useState()



  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const docs = []
    const querySnapshot = await getDocs(collection(db, "products"));
    console.log("querySnapshot", querySnapshot)
    querySnapshot.forEach((doc) => {
      docs.push({...doc.data()})
      setListProduct(docs)
    })
    setIsFetching(false)
  
  }
  console.log("listProduct", listProduct)


  if (isFetching === true) {
    return <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
  }

  return (
    <div>
    <h1>Listado de Productos</h1>
    <div className='products-container'>
      <table className='product-table'>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {listProduct.map((eachProduct) => (
            <tr key={eachProduct.id}>
              <td>
                <Link to={`/product/${eachProduct.id}/details`}>
                  <img src={eachProduct.picture} alt="pict" />
                </Link>
              </td>
              <td>
                <Link to={`/product/${eachProduct.id}/details`}>
                  {eachProduct.name}
                </Link>
              </td>
              <td>{eachProduct.price}€</td>
              <td>
                {eachProduct.contieneTallas ? (
                  <div>
                    <p>Talla S: {eachProduct.size[0].stock}</p>
                    <p>Talla M: {eachProduct.size[1].stock}</p>
                    <p>Talla L: {eachProduct.size[2].stock}</p>
                    <p>Talla XL: {eachProduct.size[3].stock}</p>
                    <p>Talla XXL: {eachProduct.size[4].stock}</p>
                  </div>
                ) : (
                  <p>Stock: {eachProduct.stock}</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default ListProducts