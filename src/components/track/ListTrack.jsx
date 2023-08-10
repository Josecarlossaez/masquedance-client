import React, { useEffect, useState } from "react";
// CSS
import "../../css/track/listTrack.css";

import Player from "@madzadev/audio-player";
import { useNavigate } from "react-router-dom";
import { listTrackService } from "../../services/track.services";


function ListTrack() {
  const navigate = useNavigate();

  // STATES
  const [trackList, setTrackList] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await listTrackService();
      setTrackList(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <p>...loading</p>;
  }

  return (
    <div className="trackList-container">
      {trackList.map((item) => {
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
      })}

      <h1>rodadnd</h1>
    </div>
  );
}

export default ListTrack;
