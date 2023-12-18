import React from "react";
// Import CSS
import "../css/colections.css";

// React
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

// Services FIREBASE
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'



function Colections() {
  const navigate = useNavigate();

  // Extract User info
  
  const { isAdmin } = useContext(AuthContext)
  
  // States
  const [isFetching, setIsFetching] = useState(true);
  const [listColection, setListColection] = useState();
  

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // Bring Products data
    try {
      const docs = []
    const querySnapshot = await getDocs(collection(db, "products"));
    console.log("querySnapshot", querySnapshot)
    querySnapshot.forEach((doc) => {
      docs.push({...doc.data(), id:doc.id})
      setListColection(docs)
    })
    setIsFetching(false)
    } catch (error) {
      navigate("/error");
    }
  };
   console.log("listColection", listColection);
 
  if (isFetching === true) {
    return <p>...loading</p>;
  }

  return (
    <div>
      <div>
        <h1>MERCHANDISING</h1>
      </div>
      <div className="products-container">
        {listColection.map((eachProduct) => {
          return (
            <div  key={eachProduct._id}>
              <Link
                to={`/colection/${eachProduct.id}/details`}
                
               
              >
                <div className="product-box">
                  <div className="image-product">
                    <img src={eachProduct.picture} alt="pict" />
                  </div>
                  <div className="product-text">
                    <h3>{eachProduct.name}</h3>
                    {/* <h4>{eachProduct.description}</h4> */}
                    <h4>{eachProduct.price}€</h4>
                  </div>
                </div>
              </Link>
              {isAdmin &&
              <Link className="link-box" to={`/colection/${eachProduct.id}/edit`}>
                <button className="general-btn"> Editar Colección</button>
              </Link>
              }
              
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Colections;
