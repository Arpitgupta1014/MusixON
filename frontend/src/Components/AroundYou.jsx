import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useGetSongsByCountryQuery} from "../redux/services/ShazamCore";
import Loader from "../assets/Loader";
import Error from '../assets/Error';
import "../Styles_sheet/Artists.css";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import {GoPlay} from "react-icons/go";

function AroundYou({songList}) {
  const [country,setCountry] = useState("");
  const [loading,setLoading] = useState(true);
  const {data,isFetching,error} = useGetSongsByCountryQuery(country);
  useEffect(()=>{
    //at_295tWjrAYfuR13xdY5nYQkjYChAE7
    //geo.ipify.org api to get country code
    axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_295tWjrAYfuR13xdY5nYQkjYChAE7`)
    .then((res)=>setCountry(res?.data?.location?.country))
    .catch((err)=>console.log(err))
    .finally(()=>setLoading(false));
  },[country]);

  if(isFetching) return <Loader title="Loading Today's Hits"/>;
  if(error && country) return <Error />;

  const handleSong = (i) =>{
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
    return songList(arr,i);
  }

  console.log(data);
  return (
    <div className="artist-container">
      <div className="top-section">
        <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2luZ2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="pic" />
        <div className="btm-effect"></div>
      </div>
      <div className="musicList">
        <h2 className="title">
          Trending Now {country}
          <i id="play-all-margin" onClick={()=>handleSong(0)}><GoPlay /></i>
        </h2>
        <div className="song-container">
          {data &&
            data.map((obj, index) => (
              <div className="songs" key={index}>
                <div className="count">{index + 1}</div>
                <div className="song">
                  <div className="img">
                    <img src={obj.share?.image? obj.share.image : "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2luZ2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"} alt="pic" />
                  </div>

                  <div className="content-section">
                    <p className="songName" onClick={()=>handleSong(index)}>
                      {obj.title}
                      <span className="singerName">{obj.subtitle}</span>
                    </p>

                    <div
                      className="loved"
                    >
                        <i id="fill-heart">
                          <FaHeart />
                        </i>
                        <i>
                          <FiHeart />
                        </i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default AroundYou;