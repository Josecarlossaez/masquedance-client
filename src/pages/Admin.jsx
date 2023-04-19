import React from "react";
// import CSS
import "../css/admin.css";

// React Hooks
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
// React hash links
import { HashLink } from "react-router-hash-link";
// Media Query
import { useMediaQuery } from "react-responsive";


// Components
import CreateProduct from "../components/product/CreateProduct";
import CreateTrack from "../components/track/CreateTrack";
// Axios Services
import {createProductService} from '../services/product.services'



function Admin() {
    //  Media Query condition
  const activeHashlink = useMediaQuery({ query: "(max-width: 1024px)" });

    //  States to components
    const [createProduct, setCreateProduct] = useState(false)
    const [createTrack, setCreateTrack] = useState(false)
     
    // Toogle components
    const handleCreateProduct = () =>{
        setCreateProduct(true)
        setCreateTrack(false)
     }
    
    const handleCreateTrack = () =>{
      setCreateProduct(false)
      setCreateTrack(true)
    } 

  return (
    <div>
      <div className="button-container">
        <HashLink smooth to="#admin-components">
          <button onClick={handleCreateProduct} className="hash-button">Crear Producto</button>
        </HashLink>

        <HashLink smooth to="#profile-components">
          <button className="hash-button">Crear Sesión</button>
        </HashLink>

        <HashLink smooth to="#profile-components">
          <button className="hash-button">Crear DJ</button>
        </HashLink>

        <HashLink smooth to="#profile-components">
          <button onClick={handleCreateTrack} className="hash-button">Crear Track</button>
        </HashLink>

        <HashLink smooth to="#profile-components">
          <button className="hash-button">Crear Vídeo</button>
        </HashLink>
        
      </div>
      <div   id={activeHashlink &&'admin-components'}>
        {/* Create Product component */}
       {createProduct && <CreateProduct/>}
       {createTrack && <CreateTrack/>}
      </div>

    </div>
  );
}

export default Admin;
