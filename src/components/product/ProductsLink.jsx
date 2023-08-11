import React from "react";
import { Link } from "react-router-dom";

// CSS
import "../../css/product/product-link.css";

function ProductsLink(props) {
  const { listProduct } = props;
  const listProductSort = listProduct.sort(() => Math.random() - 0.5)
  return (
    <div className="product-link-container">
      <div className="div-title-product">
        <h3>Merchandising</h3>
      </div>

      <div className="product-div-container">
        <div className="product-div" >
          <Link to="/list-colections" target="_blank" className="product-link" > 
          <img src={listProductSort[0].picture} alt="product-imagen" />
          </Link>
        </div>
        <div className="product-div-center">
          <Link to="/list-colections" target="_blank" className="link-twitch-link"> 
          <h4>{listProductSort[0].name}</h4>
          <img src={listProductSort[0].picture} alt="product-imagen"  />
          </Link>
        </div>
        <div className="product-div" >
          <Link to="/list-colections" target="_blank" className="link-twitch-link"> 
          <img src={listProductSort[0].picture} alt="product-imagen" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductsLink;
