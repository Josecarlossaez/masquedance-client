import React from 'react'
import { Link } from 'react-router-dom'

// CSS
import "../../css/twitchLink/twichLink.css"

function TwitchLink(props) {
    const {listTwitchLink } = props
    console.log("listTwitchLink",listTwitchLink[0].link)
  return (
    <div className='twitch-link-container' >
        <Link to={listTwitchLink[0].link} target="_blank" className='link-twitch-link'>
            <img src={listTwitchLink[0].picture} alt="twitch-link" className='image-twitch-link'/>
        </Link>
    </div>
  )
}

export default TwitchLink