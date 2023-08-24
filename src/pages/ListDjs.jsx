import React, { useEffect, useState } from 'react'
//CSS
import "../css/DJ/listDj.css"
import djLogo from "../images/dj-sombra.webp"
import { useNavigate } from 'react-router-dom'
import { listDjService } from '../services/dj.services'

import logoPeque from "../images/logoPeque.png"
import { Link } from 'react-router-dom'

function ListDjs() {

  const navigate = useNavigate()

  const [isFetching, setIsFetching] = useState(true);
  const [djList, setDjList] = useState()


  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await listDjService()
      setDjList(response.data);
      setIsFetching(false);

    } catch (error) {
      navigate("/error")
    }
  }



  if (isFetching === true) {
    return <p>...loading</p>;
  }


  return (
    <div className='list-dj-page' >
      <div className='list-dj-header'>
        <img src={djLogo} alt="" />
        <h3>Entendemos la Música como la vivimos</h3>
      </div>
      <div className='list-dj-container'>
        {
          djList.map((each) => {
            return (
                <div className='card-dj'key={each._id} >
              <Link  to={`/dj/${each._id}/details`}>
                  <div className='card-dj-picture'>
                    <img src={each.picture} alt="djPicture" />
                  </div>
                  <div className='card-dj-name'>
                    <h3>{each.name}</h3>
                  </div>
              </Link>
                </div>

            )

          })
        }
      </div>
    </div>
  )

}

export default ListDjs