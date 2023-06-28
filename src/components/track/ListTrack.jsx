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
  const [tracks, setTracks] = useState(null);
  

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await listTrackService();
      setTrackList(response.data);
      setIsFetching(false);
      const mappedTracks = response.data.map((item) => ({
        url: item.audio,
        title: item.title,
        tags: [item.title],
      }));
      setTracks(mappedTracks);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <p>...loading</p>;
  }

  return (
    <div className="trackList-container">
      <Player trackList={tracks} />
      <h1>rodadnd</h1>
    </div>
  );
}

export default ListTrack;

