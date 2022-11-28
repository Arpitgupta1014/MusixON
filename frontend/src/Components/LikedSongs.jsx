import React,{useState,useEffect} from 'react';
import { FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { GoPlay } from 'react-icons/go';
import "../Styles_sheet/LikedSong.css";
import "../Styles_sheet/Artists.css";
import {Cookies, useCookies} from 'react-cookie';
import axios from 'axios';

function LikedSongs({songList,userId}) {
  const [songs, setSongs] = useState([]);
  const [cookies,removeCookies] = useCookies([]);

  useEffect(()=>{
    const func = async()=>{
      if(!cookies.jwt){
        console.log("user not present");
      }
      else{
        const { data } = await axios.post(
          "http://localhost:5000/giveLikedSong",
          {id:userId},
          { withCredentials: true }
        );
        setSongs([...data.likedSongList]);
        console.log(data);
      }
    }
    func();
  },[cookies]);

  const removeLike = async(id,song_name)=>{
    const{data} = await axios.post("http://localhost:5000/removeFromLiked",{
      id,song_name
    },{
      withCredentials:true,
    });
    console.log(data);
  }
  
  const removeFavourite = (idx) =>{
    let index=0;
    let arr = songs;
    arr.forEach((ele)=>{
      if(ele.indx===idx){
        arr.splice(index,1);
        removeLike(userId,ele.song_name);
      }
      index+=1;
    })
    setSongs([...arr]);
  }
  
  //Ading active classes
  useEffect(() => {
    const allPara = document
      .querySelector(".liked-song-container .artist-container .song-container")
      .querySelectorAll(".songName");

    function changeActive() {
      allPara.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");
    }

    allPara.forEach((i) => i.addEventListener("click", changeActive));
  }, []);

  const handleCurrSong = (obj) =>{
    let arr = [];
    arr.push(obj);
    return songList(arr);
  }
  
  const handleSongList = () =>{
    return songList(songs);
  }
 
  return (
    <div className="liked-song-container">
      <div className="top-lk-sec">
        <div className="img-lk-sec">
         <img src="https://i.scdn.co/image/ab67616d00001e0289f0f3145bcdd71276f3e78e" alt="pic" />
         </div>
         <div className="content-lk-sec">
           <h3>Liked Songs</h3>
           <p id="lk-playlist">PLAYLIST</p>
           <p id="lk-song-count">{songs.length} songs</p>
         </div>
         <div className="btmEffect"></div>
      </div>
      <div className="artist-container">
       <div className="musicList">
         <div className="title-lk">
           <p># Title</p>
           <p>Singer</p>
           <i onClick={handleSongList}><GoPlay /></i>
         </div>
         <div className="song-container inc-song-cont-hgt">
            {songs && songs.map((obj,idx)=>(
                <div className="songs" key={idx}>
                <div className="count">{idx+1}</div>
                <div className="song">
                    <div className="img">
                        <img src={obj.song_img_src} alt="pic" />
                    </div>
                     
                    <div className="content-section">
                        <p className="songName" onClick={() => handleCurrSong(obj)} >
                            {obj.song_name}
                            <span className="singerName">{obj.singer_name}</span>
                        </p>

                       <div className="loved" onClick={()=>removeFavourite(obj.indx)}>
                        {obj.fav ? <i id="fill-heart"><FaHeart /></i> : <i><FiHeart /></i>}
                       </div>
                    </div>
                </div>
            </div>
            ))}
         </div>
       </div>
    </div>
    </div>
  )
}

export default LikedSongs