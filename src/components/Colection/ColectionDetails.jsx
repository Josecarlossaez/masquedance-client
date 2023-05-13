import React from "react";
import "../../css/product/details-product.css";
import { useEffect, useState } from "react";

import { useNavigate, useParams, Link } from "react-router-dom";
// Services
import { detailsColectionService } from "../../services/colection.services";
import { ClimbingBoxLoader } from "react-spinners";

function ColectionDetails() {
  const { colectionId } = useParams();
  const navigate = useNavigate();

  // States

  const [isFetching, setIsFetching] = useState(true);

  const [colectionDetails, setColectionDetails] = useState();

  // States to check the sizes availables of this product
  
  // States to add object to Cart
  const [cantidad, setCantidad] = useState(1);
  const [sizeSelected, setSizeSelected] = useState("S");
  useEffect(() => {
    getData();
  }, []);
  // Get the product Details data from API
  const getData = async () => {
    try {
      const details = await detailsColectionService(colectionId);

      setColectionDetails(details.data);


      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

 console.log("colectionDetails",colectionDetails)
  

  // Select quantity
  const handleCantidad = (e) => setCantidad(e.target.value);
  //   const handleSizeSelected = (e) = setSizeSelected(e.target.value)

  const tallas = colectionDetails?.products.filter((each) => each.size === sizeSelected)


  if (isFetching === true) {
    return <p>LOading...</p>;
  }
  return (
    <div>
      <div>
        <h1>Product Details</h1>
      </div>
      <div className="details-container">
        <div className="details-image">
          <img src={colectionDetails?.picture} alt="" />
        </div>
        <div className="details-data">
          <div className="details-info">
            <h3>{tallas[0].name}</h3>
            <h3>Talla: {tallas[0].size}</h3>
            <h3>Precio: {tallas[0].price}€</h3>
            <h3>Descripción del artículo: {tallas[0].description}</h3>
          </div>
          <div className="details-sizeList">
          <h2>Seleccione Talla:</h2>
          {colectionDetails?.products.map((eachP) => (
            <div key={eachP._id}>
               <button className="sizes" onClick={() => setSizeSelected(eachP.size)}>
              <h1>{eachP.size}</h1>
            </button>
            </div>
             
          ))}
           
          </div>
          <div>
            <label htmlFor="quantity">Cantidad:</label>
            <select name="quantity" value={cantidad} onChange={handleCantidad}>
              {Array.from({ length: 30 }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button className="general-btn">Añadir al carrito</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColectionDetails;
