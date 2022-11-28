import React,{useState,useRef,useEffect} from 'react';
import {FaHeart} from "react-icons/fa";
import {FiHeart} from "react-icons/fi";
import {BiShuffle} from "react-icons/bi";
import {AiFillLeftCircle} from "react-icons/ai";
import {AiFillRightCircle} from "react-icons/ai";
import {FaPlayCircle} from "react-icons/fa";
import {FaPauseCircle} from "react-icons/fa";
import {BiRepeat} from "react-icons/bi";
import {GoMute} from "react-icons/go";
import {GiSpeaker} from "react-icons/gi";
import {MdRepeatOne} from "react-icons/md";
import "../Styles_sheet/MediaPlayer.css";
import ReactAudioPlayer from "react-audio-player";
import axios from 'axios';
import Error from '../assets/Error';
import Loader from '../assets/Loader';

function MediaPlayer({songs,ind,userId,updateLiked}){
  const[index,setIndex] = useState(ind);
  const[currSong,setCurrSong] = useState(songs[ind]);
  const[isPlay,setIsPlay] = useState(false);
  const[isMute,setIsMute] = useState(false);
  const[isRepeat,setIsRepeat] = useState(false);
  const[duration,setDuration] = useState(0);
  const[currentTime,setCurrentTime] = useState(0);
  const[volume,setVolume] = useState(30);

  const audioPlayer = useRef();
  const progressBar = useRef();
  const animationRef = useRef();
  
  // Songs updated every time when new array of songs came
  useEffect(()=>{
    setIndex(ind);
    setCurrSong(songs[ind]);
    setIsPlay(false);
  },[songs,ind]);

  //handleLikedSong

  const changeFavourite = (obj) =>{
    // obj.fav = !obj.fav;
  }
  // send current playing song to backend..
  useEffect(()=>{
    if(!currSong) return;
    const fun = async()=>{
      //console.log(userId);
      const {data} = await axios.post("http://localhost:5000/recentlyPlayedSongs",{
        id:userId,indx:currSong?.idx,song_name:currSong?.song_name,song_src:currSong?.song_src,song_img_src:currSong?.song_img_src,singer_name:currSong?.singer_name,fav:false
      },{ 
        withCredentials:true,
      });
      //console.log(data);
      return;
    }
    fun();
  },[index,currSong]);

  useEffect(()=>{
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
    // changeCurrentTime();
  },
  [audioPlayer?.current?.loadedmetadata,
   audioPlayer?.current?.readyState
  ]);

  //volume control functionalities
  useEffect(()=>{
    if(audioPlayer){
      audioPlayer.current.volume = volume/100;
    }
    if(volume>0){
      setIsMute(false);
    }
  },[volume])

  if(currSong?.idx==="undefined") return <Error />;

  const handleSound = () =>{
    setIsMute(!isMute);
    if(!isMute) setVolume(0);
    if(isMute){
      setVolume(1);
    }
  }

  function handlePlayer(){
    const prevStateValue = isPlay;
    if(!prevStateValue){
        audioPlayer.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
    }else{
        audioPlayer.current.pause();
        cancelAnimationFrame(animationRef.current);
    }
    setIsPlay(!prevStateValue);
  }
 
  const calculateTime = (sec) =>{
    const minutes = Math.floor(sec/60);
    const fminutes = minutes<10 ? `0${minutes}`:minutes;
    const seconds = Math.floor(sec%60);
    const fseconds = seconds<10 ? `0${seconds}`:seconds;
    const ftime = `${fminutes}:${fseconds}`;
    return ftime;
  }
  
  const whilePlaying = () =>{
    progressBar.current.value = audioPlayer.current.currentTime;
    changeCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }
  const changeProgress = () =>{
    audioPlayer.current.currentTime = progressBar.current.value;
    changeCurrentTime();
  }
   
  const changeCurrentTime = () =>{
    progressBar.current.style.setProperty("--player-played",`${progressBar.current.value/duration*100}%`);
    setCurrentTime(progressBar.current.value);
  }

  const handleSongEnded = () =>{
    setIsPlay(false);
  }

  //repeat current song 
  const handleRepeat = () =>{
    setIsRepeat(!isRepeat);
  }

  //next and previous buttons
  const handleNextSong = () =>{
    setIsPlay(false);
    if(index>=songs.length-1){
      setIndex(0);
      setCurrSong(songs[0]);
    }else{
      setIndex(prevCount => prevCount+1);
      setCurrSong(songs[index+1]);
    }
  }

  const handlePreviousSong = () =>{
    setIsPlay(false);
    if(index>0){
      setIndex(prevCount => prevCount-1);
      setCurrSong(songs[index-1]);
    }else{
      setIndex(songs.length-1);
      setCurrSong(songs[songs.length-1]);
    }
  } 
  
  //Shuffle Functionality
  const handleShuffle = () =>{
    setIsPlay(false);
    const newIndex = Math.floor(Math.random()*songs.length);
    if(newIndex>=songs.length) newIndex = songs.length-1;
    setIndex(newIndex);
    setCurrSong(songs[newIndex]);
  }
  

  return (
    <div className="music-container">
      <div className="left-music-part">
        <audio loop={isRepeat} src={currSong?.song_src} preload="metadata" ref={audioPlayer} onEnded={handleSongEnded}></audio>
           
        <img src={currSong?.song_img_src} alt="pic" />
        <div className="content-music-lf">
          <p id="msc-con1">{currSong?.song_name}</p>
          <p id="msc-con2">{currSong?.singer_name}</p>
        </div>
        {/* {currSong.fav ? <i id="liked" onClick={()=>changeFavourite(currSong)} ><FaHeart /></i> : <i id="not-liked" onClick={()=>changeFavourite(currSong)}><FiHeart /></i>} */}
      </div>
      <div className="middle-music-part">
        <div className="top-middle-msc">
           <i id="doShuffle" onClick={handleShuffle}><BiShuffle /></i>
           <i onClick={handlePreviousSong}><AiFillLeftCircle /></i>
           {isPlay ? <i id="play-msc" onClick={handlePlayer}><FaPauseCircle /></i> : 
            <i id="play-msc" onClick={handlePlayer}><FaPlayCircle /></i> }
           <i onClick={handleNextSong}><AiFillRightCircle /></i>
           {isRepeat ? <i id="repeat-now" onClick={handleRepeat}><MdRepeatOne/></i> : <i id="doShuffle"onClick={handleRepeat}><BiRepeat /></i>}
        </div>
        <div className="btm-middle-msc">
           <p className="duration">{calculateTime(currentTime)}</p>

           <input type="range" id="range" onChange={changeProgress} ref={progressBar} value={currentTime}/>

           <p className="duration">{(duration && !isNaN(duration)) ? calculateTime(duration) : "00:00"}</p>
        </div>
      </div>
      <div className="right-music-part">
        {(isMute || volume==0) ? <i onClick={handleSound}><GoMute /></i> : <i onClick={handleSound}><GiSpeaker /></i>}
        <input type="range" id="volume" min={0} max={100} value={volume}
         onChange={(e)=>setVolume(e.target.value)} 
        />
      </div>
    </div>
  );
}

export default MediaPlayer;