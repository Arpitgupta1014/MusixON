import React, { useState,useEffect } from 'react'
import {BsFillPlayCircleFill} from "react-icons/bs";
import {useGetTopChartsQuery} from "../redux/services/ShazamCore";
import {FaArrowCircleLeft} from "react-icons/fa";
import {FaArrowCircleRight} from "react-icons/fa";
import Loader from "../assets/Loader";
import Error from "../assets/Error";
import {Link} from "react-router-dom";
import {BsThreeDotsVertical} from "react-icons/bs";

function Trending({songArray}){
  const [text,setText] = useState("See All");
  const [size,setSize] = useState(7);

  const {data,isFetching,error} = useGetTopChartsQuery();
  if(isFetching) return <Loader title="Loading Trending Songs"/>
  if(error) return <Error />
  function handleSong(obj,i){
    let arr = [];
    data.forEach((song)=>{
      let obj = {
        idx : `${song.artists? song.artists[0].adamid : null}`,
        singer_name : song?.subtitle,
        song_name : song?.title,
        song_src : `${song.hub.actions? song.hub.actions[1].uri : null}`,
        song_img_src : song?.share?.image
      }
      arr.push(obj);
    })
    return songArray(arr,i);
  }
  // console.log(data);
  const handleAllTrendingSongs = () =>{
    if(text==="See All"){
      setText("See Less")
      setSize(data.length);
    }else{
      setText("See All")
      setSize(7);
    }
  }

  return (
    <>
    <h2 id="recent">Trending This Week!! 
      <span onClick={handleAllTrendingSongs}>{text}</span>
    </h2>
    <div className="songs-row">
    <div className="songs-card">
           {
            data && data.slice(0,size).map((obj,idx)=>(
               <div className="songs" key={obj.key} onClick={()=>handleSong(obj,idx)}>
               <img src={obj?.images?.coverart} alt="pic" />
               <Link to={`/songs/${obj.key}`}><BsFillPlayCircleFill/></Link>
               <h3 id="name">{obj?.title}</h3>
               <h3 id="singer">{obj?.subtitle}</h3>

               </div>
            ))
           }
    </div>
    </div>
    </>
  );
}

export default Trending;