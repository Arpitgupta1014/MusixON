import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Styles_sheet/SongDetails.css";
import Loader from "../assets/Loader";
import Error from "../assets/Error";
import { useGetSongDetailsQuery } from "../redux/services/ShazamCore";
import addSong from "../assets/AddSong";
import { FaHeart } from "react-icons/fa";

function SongDetails() {
  const [liked,setLiked] = useState(false);
  const { songid } = useParams();
  const { data, isFetching, error } = useGetSongDetailsQuery(songid);
  if (isFetching) return <Loader title="Loading Song Details" />;
  if (error) return <Error />;
  var lyric = null;
  data?.sections?.map((obj)=>{
    if(obj.type==="LYRICS") lyric=obj.text;
  })
  // console.log(data);
  return (
    <div className="songDetailsContainer">
      <div className="song-det-box">
        <div className="img-top">
          <img
            src={data?.images?.coverart ? data?.images?.coverart : null}
            alt="pic"
          />
          <p className="songName">
            {data?.title} - {data?.subtitle}
          </p>
          <p className="songName dim">
            {data?.genres?.primary}
          </p>
        </div>
        <div className="contentSongSec">
           {
            addSong && addSong.map((obj,idx)=>(
              <div className="add-list" key={obj.id}>
                <i className="sec-logo">{(liked && obj.id==3) ? <FaHeart /> : obj.icon}</i>
                <span className="sec-head">{(liked && obj.id==3) ? `Remove From Liked Song` : obj.name}</span> 
              </div>
            ))
           }
        </div>
        <div className="lyrics">
          <h3 style={{"color":"white","marginLeft":"12px","fontSize":"18px","fontWeight":"400","fontFamily":"cursive","position":"fixed"}}>{lyric ? "Lyrics" : "No Lyrics Found"}</h3>
          {
            lyric ?  lyric.map((obj,idx)=>(
              <div className="lyrics-section" key={idx}>
              <p className="lyrics-para">
                {obj}
              </p>
              </div>
            )) : null
          }
        </div>
      </div>
    </div>
  );
}

export default SongDetails;
