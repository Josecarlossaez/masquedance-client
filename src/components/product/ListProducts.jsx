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
      docs.push({...doc.data(), id:doc.id})
      setListProduct(docs)
    })
    setIsFetching(false)
  
  }
  console.log("listProduct", listProduct)


  if (isFetching === true) {
    return <p>...loading</p>
  }

  return (
    <div>


      <div>

        <h1>list product</h1>
      </div>
      <div className='products-container'>
        {
          listProduct.map((eachProduct) => {

            return (
              <Link to={`/product/${eachProduct.id}/details`} >
                <div key={eachProduct.id}>
                  <div className='product-box' >

                    <div className='image-product'>
                      <img src={eachProduct.picture} alt="pict" />
                    </div>
                    <div className='product-text'>
                      <h3>{eachProduct.name}</h3>
                      <h4>{eachProduct.price}€</h4>
                      {/* <h4>Talla {eachProduct.size}</h4> */}
                    </div>
                  </div>


                </div>
              </Link>
            )


          })
        }

      </div>
    </div>
  )
}

export default ListProducts