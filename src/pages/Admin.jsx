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
import CreateDj from "../components/dj/CreateDj";
import CreateColection from "../components/Colection/CreateColection";
import ListProducts from "../components/product/ListProducts";
import CreateTwitchLink from "../components/twitchLink/CreateTwitchLink";
import CreateVideo from "../components/videos/CreateVideo";




function Admin() {
    //  Media Query condition
  const activeHashlink = useMediaQuery({ query: "(max-width: 1024px)" });

    //  States to components
    const [createProduct, setCreateProduct] = useState(false)
    const [createTrack, setCreateTrack] = useState(false)
    const [createDj, setCreateDj] = useState(false)
    const [createColection, setCreateColection] = useState(false)
    const [listProduct, setlistProduct] = useState(false)
    const [createTwitchLink, setCreateTwitchLink] = useState(false)
    const [createVideo, setCreateVideo] = useState(false)
     
    // Toogle components
    const handleCreateProduct = () =>{
      setCreateProduct(true)
      setCreateTrack(false)
      setCreateColection(false)
      setCreateTwitchLink(false)
      setCreateVideo(false)
    
     }
    
    const handleCreateTrack = () =>{
      setCreateProduct(false)
      setCreateTrack(true)
      setCreateDj(false)
      setCreateColection(false)
      setCreateTwitchLink(false)
      setCreateVideo(false)
      
    } 
    const handleCreateDj = () =>{
      setCreateDj(true)
      setCreateProduct(false)
      setCreateTrack(false)
      setCreateColection(false)
      setCreateTwitchLink(false)
      setCreateVideo(false)
   }
    const handleCreateColection = () =>{
      setCreateProduct(false)
      setCreateTrack(false)
      setCreateDj(false)
      setCreateColection(true)
      setCreateTwitchLink(false)
      setCreateVideo(false)
 }
    const handleListProduct = () => {
      setlistProduct(true)
      setCreateProduct(false)
      setCreateTrack(false)
      setCreateDj(false)
      setCreateColection(false)
      setCreateTwitchLink(false)
      setCreateVideo(false)
    }
    const handleCreateTwitchLink = () => {
      setCreateTwitchLink(true)
      setlistProduct(false)
      setCreateProduct(false)
      setCreateTrack(false)
      setCreateDj(false)
      setCreateColection(false)
      setCreateVideo(false)

    }
    const handleCreateVideo = () => {
      setCreateTwitchLink(false)
      setlistProduct(false)
      setCreateProduct(false)
      setCreateTrack(false)
      setCreateDj(false)
      setCreateColection(false)
      setCreateVideo(true)
    }


  return (
    <div>
      <div className="button-container">
        <HashLink smooth to="#admin-components">
          <button onClick={handleListProduct} className="hash-button">Productos</button>
        </HashLink>

        <HashLink smooth to="#admin-components">
          <button onClick={handleCreateProduct} className="hash-button">Crear Producto</button>
        </HashLink>

        <HashLink smooth to="#admin-components">
          <button onClick={handleCreateColection} className="hash-button">Crear Colección</button>
        </HashLink>

        <HashLink smooth to="#profile-components">
          <button className="hash-button">Crear Sesión</button>
        </HashLink>

        <HashLink smooth to="#profile-components">
          <button onClick={handleCreateDj} className="hash-button">Crear DJ</button>
        </HashLink>

        <HashLink smooth to="#profile-components">
          <button onClick={handleCreateTrack} className="hash-button">Crear Track</button>
        </HashLink>

        <HashLink smooth to="#profile-components">
          <button onClick={handleCreateVideo} className="hash-button">Crear Vídeo</button>
        </HashLink>

        <HashLink smooth to="#profile-components">
          <button onClick={handleCreateTwitchLink} className="hash-button">Crear TwitchLink</button>
        </HashLink>

        
      </div>
      <div   id={activeHashlink &&'admin-components'}>
        {/* Create Product component */}
       {listProduct && <ListProducts/>}
       {createProduct && <CreateProduct/>}
       {createColection && <CreateColection/>}
       {createTrack && <CreateTrack/>}
       {createDj && <CreateDj/>}
       {createTwitchLink && <CreateTwitchLink/>}
       {createVideo && <CreateVideo/>}
      </div>

    </div>
  );
}

export default Admin;
