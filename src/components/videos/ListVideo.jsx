import React, { useState, useEffect } from "react";
// CSS
import "../../css/video/listVideo.css";

// Services
import { listVideoService } from "../../services/video.services";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

function ListVideo() {
  const navigate = useNavigate();
  const [videoList, setVideoList] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await listVideoService;
      setVideoList(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };
 
  console.log("open",open);

  
  if (isFetching === true) {
    return <p>LOading...</p>;
  }

  return (
    
    <div className="video-container">
    <div className="data-container">
        <div onClick={()=> setOpen(!open)}>
            <div >
              <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.discogs.com%2F1Bel4vj5lZ42pTNzTDQcbXmNo0qfsmn7fpZuG0AcuPs%2Frs%3Afit%2Fg%3Asm%2Fq%3A90%2Fh%3A584%2Fw%3A600%2FczM6Ly9kaXNjb2dz%2FLWRhdGFiYXNlLWlt%2FYWdlcy9SLTQ0NTIz%2FNC0xMjQ3ODQ0Njc0%2FLmpwZWc.jpeg&tbnid=__d4PMeAdKU17M&vet=12ahUKEwjMzfDetub_AhUMnCcCHWQUDB0QMygAegUIARCNAQ..i&imgrefurl=https%3A%2F%2Fwww.discogs.com%2Fes%2Frelease%2F445234-La-Luna-When-The-Morning-Comes&docid=5P_WiCRdo6O0iM&w=600&h=584&q=la%20luna%20when%20the%20morning%20comes&ved=2ahUKEwjMzfDetub_AhUMnCcCHWQUDB0QMygAegUIARCNAQ" alt="" />
            </div>
            <div>
                 <h2>LA LUNA - When the morning comes</h2>
            </div>
        </div>
        {
            open && 
        <div>
        <ReactPlayer
        url="https://www.youtube.com/watch?v=MLHukj6wZNg&t=6121s&ab_channel=masQDance"
        config={{ youtube: { playerVars: { origin: window.location.origin } } }}
        controls={true}
        progress={true}
      />
            </div>
        }
      
        </div>
    
    </div>
  );
}

export default ListVideo;
