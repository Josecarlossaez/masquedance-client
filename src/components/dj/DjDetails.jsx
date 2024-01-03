import React, { useContext, useEffect, useState } from 'react'
//CSS
import "../../css/DJ/djDetails.css"
import { useNavigate, useParams } from 'react-router-dom';
// Services Firebase
import { collection, getDocs,doc,getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import Player from '@madzadev/audio-player';
import { AuthContext } from "../../context/auth.context.js";
import { Link } from 'react-router-dom';


function DjDetails() {
    // Admin Credentials
const {  user } = useContext(AuthContext);
    const navigate = useNavigate()
    const { djId } = useParams();


    const [isFetching, setIsFetching] = useState(true);
    const [dj, setDj] = useState()
    const [trackByDj, setTrackByDj] = useState([])
  const [okMessage, setOkMessage] = useState("");



    useEffect(() => {
        getData()
    }, [])
  console.log("dj -->",dj);
    const getData = async () => {
      try {
        const dj = doc(db, 'djs', djId)
        const djById = await getDoc(dj)
        setDj(djById.data());
        setIsFetching(false);
      } catch (error) {
        navigate("/error");
      }
    }

    const handleDeleteDj = async (e) => {
        e.preventDefault()

        try {
          const result = window.confirm("Estás seguro que quieres eliminar este Dj??")
          if (result) {
              await deleteDoc(doc(db, "djs", djId));
          setOkMessage("DJ Borrado Correctamente")
          setTimeout(() => {
             navigate("/list-djs")
          },2000)
          } else {
            console.log("entrando en return");
            return
          }
        } catch (error) {
          navigate("/error")
        }
       }



    if (isFetching === true) {
        return <p>...loading</p>;
    }
    return (
        <div className='dj-page'>
            <div className='dj-data'>
                <div className='dj-picture'>
                    <img src={dj?.picture} alt="" />

                </div>
                <div className='dj-name-description'>
                <div className='dj-name'>
                   <h2>{dj?.name}</h2>
                </div>
                     <div className='dj-description'>
                  <h4>{dj?.description}</h4>
                </div>
                

       
                </div>
               
            </div>
            {user?.user.role === "admin" &&
        <div className='button-admin-container'>
               <Link to={`/dj/${djId}/update`}>
            <button className="general-btn"> Actualizar Dj</button>
        </Link>
        <button
            type="submit"
            onClick={handleDeleteDj}
           className="general-btn"
          >
           Eliminar DJ
          </button>
        </div>
        }
            <div className='dj-tracks'>
                {trackByDj?.length === 0?
                    (
                        <h1>Este dj no tiene canciones</h1>
                    ) : (
                        trackByDj.map((item) => {
        const track = [
          {
            url: item.audio,
            title: item.title,
            tags: [item.title],
          },
        ];
        console.log("track", track);
        return (
          <div key={item._id} className="track-container">
            <div className="track-img" style={{ backgroundImage: `url(${item.picture})` }}>
              <img src="" alt="" />
            </div>
            <div className="track-player">
              <Player className='player'
                trackList={track}
                includeTags={false}
                includeSearch={false}
                showPlaylist={false}
                autoPlayNextTrack={false}
              />
            </div>
          </div>
        );
      })
                    )


                }

            </div>

        </div>
    )
}

export default DjDetails