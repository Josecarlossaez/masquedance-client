import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
import { db } from '../firebase'



function Home() {
  const navigate = useNavigate()

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
      const responseTwitch = await listTwitchLinkService()
      setListTwitchLink(responseTwitch.data)
      setIsFetching(false)

    } catch (error) {
      navigate("/error")
    }
  }


  if (isFetching === true) {
    return <p>...loading</p>
  }
  return (
    <div className='home-container'>
      <div className='twitch-link-container'>
          <TwitchLink listTwitchLink={listTwitchLink} />
      </div>

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