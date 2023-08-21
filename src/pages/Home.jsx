import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import '../css/home.css'
// Services
import { listTwitchLinkService } from '../services/twitchLink.services';
import { listProductService } from '../services/product.services';
import TwitchLink from '../components/twitchLink/TwitchLink';
import ProductsLink from '../components/product/ProductsLink';
import ListVideo from '../components/videos/ListVideo';

// IMAGES
import twitchIcon from "../images/twitch.svg"
import facebookIcon from "../images/facebook.svg"
import youtubeIcon from "../images/youtube.svg"
import twitterIcon from "../images/twitter.svg"



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
      const responseTwitch = await listTwitchLinkService()
      const responseProduct = await listProductService()
      setListTwitchLink(responseTwitch.data)
      setListProduct(responseProduct.data)
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
      <div className='socialMedia-links-container'>
      <a href="">
        <img src={twitterIcon} alt="" />
      </a>
      <a href="">
        <img src={twitchIcon} alt="" />
      </a>
      <a href="">
        <img src={facebookIcon} alt="" />
      </a>
      <a href="">
        <img src={youtubeIcon} alt="" />
      </a>

      </div>
    
      <div className='twitch-link-container'>

        <TwitchLink listTwitchLink={listTwitchLink} />
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