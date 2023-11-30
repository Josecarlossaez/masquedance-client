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
  
  const { user } = useContext(AuthContext)
  
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
    const querySnapshot = await getDocs(collection(db, "colections"));
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
        {listColection.map((eachColection) => {
          return (
            <div  key={eachColection._id}>
              <Link
                to={`/colection/${eachColection.id}/details`}
                
               
              >
                <div className="product-box">
                  <div className="image-product">
                    <img src={eachColection.picture} alt="pict" />
                  </div>
                  <div className="product-text">
                    <h3>{eachColection.name}</h3>
                    {/* <h4>{eachColection.description}</h4> */}
                    <h4>{eachColection.price}€</h4>
                  </div>
                </div>
              </Link>
              {user?.user.role === "admin" &&
              <Link className="link-box" to={`/colection/${eachColection.id}/edit`}>
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
