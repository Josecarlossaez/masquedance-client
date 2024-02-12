import React, { useContext, useEffect, useState } from 'react'
//CSS
import "../../css/DJ/djDetails.css"
import { useNavigate, useParams } from 'react-router-dom';
// Services Firebase
import { collection, getDocs,doc,getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import Player from '@madzadev/audio-player';
import { Link } from 'react-router-dom';

// Context
import { AuthContext } from "../../context/auth.context.js";

import plato from "../../images/technics-ortofon.jpeg"


function DjDetails() {
    // Admin Credentials
const {  isAdmin } = useContext(AuthContext);
    const navigate = useNavigate()
    const { djId } = useParams();


    const [isFetching, setIsFetching] = useState(true);
    const [dj, setDj] = useState()
    const [tracks, setTracks] = useState()
    const [tracksByDj, setTracksByDj] = useState()
  const [okMessage, setOkMessage] = useState("");



    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
      console.log("datos del dj",dj)
      getDjTracks()

  }, [dj])

  useEffect(() => {
    console.log("Estado actualizado", tracks)
    const transformedTracks = tracks?.map((item) => {
      if (item.dj === dj.name) {
        console.log("he encontrado un resultado en ",item.dj);
        return {
          url: item.audio,
          title: item.title,
          tags: [item.dj],
          picture: item.picture  
        };
      }
      return null
    }).filter(Boolean)
    console.log("transformedTracks", transformedTracks)
    setTracksByDj(transformedTracks)
}, [tracks])


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
    const getDjTracks = async () => {
      setIsFetching(true)
      try {
        const docs = []
        const querySnapshot = await getDocs(collection(db, "tracks"));
        console.log("querySnapshot", querySnapshot)
        querySnapshot.forEach((doc) => {
          docs.push({...doc.data(), id:doc.id})
          setTracks(docs)
          setIsFetching(false)
        })
      } catch (error) {
        console.log("este es el error  en trackBydjfunction",error)
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
            {isAdmin &&
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
                {tracksByDj?.length === 0?
                    (
                      <img className='plato-technics' src={plato} alt="technics" />
                    ) : (
                        tracksByDj?.map((item) => {
        const track = [
          {
            url: item.url,
            title: item.title,
            tags: [item.dj],
            picture: item.picture
          },
        ];
        return (
          <div key={item._id} className="track-container">
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