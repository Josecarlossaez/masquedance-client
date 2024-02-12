import React, { useEffect, useState } from "react";
// CSS
import "../../css/track/listTrack.css";

import Player from "@madzadev/audio-player";

import { useNavigate } from "react-router-dom";
// Services FIREBASE
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'


function ListTrack({curTrack}) {
  console.log("props",curTrack)
  const navigate = useNavigate();
  
  // STATES
  
  const [isFetching, setIsFetching] = useState(true);
  const [track, setTrack] = useState()
  const [currentTrackIndex, setCurrentTrackIndex] = useState();
  
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    console.log("currentTRack", currentTrackIndex)
  }, [currentTrackIndex]);
  
  const getData = async () => {
    try {
      const docs = []
      const querySnapshot = await getDocs(collection(db, "tracks"));
      console.log("querySnapshot", querySnapshot)
      querySnapshot.forEach((doc) => {
        docs.push({...doc.data(), id:doc.id})
      })
      console.log("docs de audio", docs)
      
      const transformedTracks = docs.map((item) => ({
        url: item.audio,
        title: item.title,
        tags: [item.dj],
        picture: item.picture  
      }));
      console.log("transformedTracks",transformedTracks)
      
      setTrack(transformedTracks)
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };
  const handleChange = (currentTrackIndex) => {
  console.log("entrando");
    
  }
  
 

   
  
  if (isFetching === true) {
    return <p>...loading</p>;
  }

  return (
    <div className="trackList-container">
      {/* {trackList.map((item) => {
        const track = [
          {
            url: item.audio,
            title: item.title,
            tags: [item.title],
          },
        ];
   
        return (
          <div key={item._id} className="track-container">
            <div className="track-img" style={{ backgroundImage: `url(${item.picture})` }}>
              <img src="" alt="" />
            </div>
            <div className="track-player">
              <Player className='player'
                trackList={track}
                includeTags={true}
                includeSearch={true}
                showPlaylist={true}
                autoPlayNextTrack={true}
              />
            </div>
          </div>
        );
      })}

      <h1>rodadnd</h1> */}
      <div  className="track-container" >
            {/* <div className="track-img" style={{ backgroundImage: `url(${item.picture})` }}>
              <img src="" alt="" />
            </div> */}
            <div className="track-player"  >
              <Player className='player'
                trackList={track}
                includeTags={true}
                includeSearch={false}
                showPlaylist={true}
                autoPlayNextTrack={true} 
                currentTrackIndex={currentTrackIndex} 
                setCurrentTrackIndex={setCurrentTrackIndex}
                onClick={()=>{handleChange()}}
                
              />

            </div>
          </div>
    </div>
  );
}

export default ListTrack;
