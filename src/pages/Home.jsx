import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import '../css/home.css'
// Services
import { listTwitchLinkService } from '../services/twitchLink.services';
import { listProductService } from '../services/product.services';
import TwitchLink from '../components/twitchLink/TwitchLink';
import ProductsLink from '../components/product/ProductsLink';
import ListVideo from '../components/videos/ListVideo';
import SocialMedia from '../components/socialMedia/SocialMedia';

// Services FIREBASE
import { collection, getDocs } from 'firebase/firestore'
import { collTwitchLinks, db } from '../firebase'

// Context
import { AuthContext } from "../context/auth.context";
import { useContext } from "react"



function Home() {
  const navigate = useNavigate()
  const {isAdmin} = useContext(AuthContext)
  // States
  const [isFetching, setIsFetching] = useState(true);
  const [listTwitchLink, setListTwitchLink] = useState(null)
  const [listProduct, setListProduct] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
    const docs = []
    const querySnapshot = await getDocs(collection(db, "products"));
    console.log("querySnapshot", querySnapshot)
    querySnapshot.forEach((doc) => {
      docs.push({...doc.data(), id:doc.id})
      setListProduct(docs)
    })
      const docsTL = []
      const responseTwitch = await getDocs(collTwitchLinks)
       responseTwitch.forEach((each)=> {
        docsTL.push({...each.data(), id:each.id})
        setListTwitchLink(docsTL)
       })
      setIsFetching(false)

    } catch (error) {
      navigate("/error")
    }
  }


  if (isFetching === true) {
    return <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
  }
  return (
    <div className='home-container'>
      <div className='twitch-link-container'>
          <TwitchLink listTwitchLink={listTwitchLink} />
      </div>
      {isAdmin &&
      
      <Link to={`/twitch-link/${listTwitchLink[0].id}/edit`}>
      <button>Editar TwitchLink</button>
      </Link>
      }

      <div>
      <SocialMedia/>
      </div>

      <div className='products-linkd-div'>
        <ProductsLink listProduct={listProduct} />
      </div>

      <div>
        <ListVideo />
      </div>  
      
    </div>
  )
}

export default Home