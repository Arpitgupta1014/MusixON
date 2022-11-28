import React,{useEffect,useState} from 'react'
import  {FcList} from "react-icons/fc"
import {RiPlayListLine} from "react-icons/ri"

function MyPlaylist({userList}) {

    return (
    <div className="playListContainer">
        <div className="nameOfPlaylist">
           <p>My Playlist</p>
           <i><FcList/></i>
        </div>
        <div className="playlistContent">
         { 
           userList && userList.map((obj)=>(
            <div className="childPlay" key={obj.id}>
            <i><RiPlayListLine/></i>
            <a href="#" id="playListName">{obj.name}</a>
            </div>
          ))
         }
        </div>
    </div>
  )
}

export default MyPlaylist;