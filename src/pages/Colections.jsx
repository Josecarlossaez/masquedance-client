import React from 'react'
// Import CSS
import "../css/colections.css"

// React
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

// Services
import { listColectionService } from '../services/colection.services';
import { listProductService } from '../services/product.services';


// Utilities
import Select from 'react-select';

function Colections() {

  const navigate = useNavigate();
// States
const [isFetching, setIsFetching] = useState(true);
const [listColection, setListColection] = useState()
const [listProduct, setListProduct] = useState()
const [productToAdd, setProductToAdd] = useState()


useEffect(() => {
  getData()
}, [])

const getData = async () => {
  // Bring Products data
  try {
      const response = await listColectionService();
      const responseProducts = await listProductService();
      setListProduct(responseProducts.data)
      setListColection(response.data)
      setIsFetching(false)
} catch (error) {
  navigate("/error")
}
}

const handleProductChange = async (e) => setProductToAdd(e.target.value)
if(isFetching === true) {
  return <p>...loading</p>
}

  return (
    <div>

    
    <div>

      <h1>list product</h1>
    </div>
   <div className='products-container'>
      {
        listColection.map((eachColection) => {
          
            return(
              <div>
              <div>
                <Link to={`/colection/${eachColection._id}/details`} className='link-box'key={eachColection._id}>
                <div className='product-box' >
                
                <div  className='image-product'>
                <img src={eachColection.picture} alt="pict"/>
                </div>
                <div className='product-text'>
                 <h3>{eachColection.name}</h3>
                 {/* <h4>{eachColection.description}</h4> */}
                 <h4>{eachColection.price}€</h4>
                </div>
                </div>
                </Link>
              </div>
              <div>
              <div className='select-input'>
              <div className='select-input'>
          <select onChange={handleProductChange}>
              {listProduct?.map((opt) => (
                <option key={opt._id} value={opt._id}>
                  {opt.name}
                </option>
              ))};
            </select>
          </div>
            </div>
              <div>
                 <button>Add Product to colection</button> 
              </div>
              
              </div>
              </div>
            )
          
          
        })
      }

   </div>
   </div>
  )
}

export default Colections