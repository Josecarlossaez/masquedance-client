import React, { useEffect, useState } from 'react'
//CSS
import "../css/DJ/listDj.css"
import djLogo from "../images/dj-sombra.webp"
import { useNavigate } from 'react-router-dom'
// Services FIREBASE
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

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
    const docs = []
    const querySnapshot = await getDocs(collection(db, "djs"));
    console.log("querySnapshot", querySnapshot)
    querySnapshot.forEach((doc) => {
      docs.push({...doc.data(), id:doc.id})
      setDjList(docs)
    })
    setIsFetching(false)
  }



  if (isFetching === true) {
    return <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
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
                <div className='card-dj'key={each.id} >
              <Link  to={`/dj/${each.id}/details`}>
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