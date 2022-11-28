import React, { useState,useEffect } from 'react';

function Recently({songArray,recentList}){

  function handleSong(obj){
    let arr = [];
    arr.push(obj);
    return songArray(arr);
  }

  return (
    <>
    {recentList ? <h2 id="recent">Recently Played</h2> : null}
    <div className="songs-row">
    <div className="songs-card recent-song-card">
           {
            recentList && recentList.map((obj,idx)=>(
               <div className="songs" key={idx} onClick={()=>handleSong(obj)}>
               <img src={obj.song_img_src} alt="pic" />
               <h3 id="name">{obj.song_name}</h3>
               <h3 id="singer">{obj.singer_name}</h3>
               </div>
            ))
           }
    </div>
    </div>
    </>
  );
}

export default Recently;