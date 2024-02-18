import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth.context';
import { Navigate, useNavigate } from 'react-router-dom';
import Orders from '../components/Orders/Orders';
import { HashLink } from 'react-router-hash-link';
import { useMediaQuery } from 'react-responsive';
import "../css/my-account.css"
import EditUserProfile from '../components/user/EditUserProfile';

function MyAccount() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  const activeHashlink = useMediaQuery({ query: "(max-width: 1024px)" });


  const [userInfo, setUserInfo] = useState()
  const [isFetching, setIsFetching] = useState(true);
  const [orders, setOrders] = useState()
  const [activeOrders, setActiveOrders] = useState(false)
  const [activeEditProfile, setActiveEditProfile] = useState(false)


  useEffect(() => {
    getData()
  }, [])
  console.log("user en myacount", user);
  const getData = () => {
    setUserInfo(user)
    setOrders(user?.orders)
    setIsFetching(false)
  }
  const handleListOrders = () => setActiveOrders(true)

  const handleEditProfile = () => setActiveEditProfile(true)

  if (isFetching === true) {
    return <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
    </div>
  }

  return (
    <div className='user-page'>
      <div className='user-data'>
        <div className='user-picture'>
          <img src={userInfo?.picture} alt="" />

        </div>
        <div className='user-name-description'>
          <div className='user-name'>
            <h2>{userInfo?.email}</h2>
          </div>
          <HashLink smooth to="#admin-components">
            <button
              type="submit"
              onClick={handleEditProfile}
              className="general-btn"
            >
              Editar Perfil
            </button>
          </HashLink>

        </div>

      </div>
      {
        orders.length !== 0 &&
        <div>
          <div id={activeHashlink && 'admin-components'}>
            <HashLink smooth to="#admin-components">
              <button onClick={handleListOrders} className="hash-button">Mis Pedidos</button>
            </HashLink>
          </div>
          {activeOrders && <Orders orders={orders} />}
          {activeEditProfile && < EditUserProfile />}
        </div>
      }
    </div>
  )
}

export default MyAccount