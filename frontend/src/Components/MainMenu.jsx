import React , {useState,useEffect} from 'react';
import axios from 'axios';
import cors from "cors";
import "../Styles_sheet/MainMenu.css";
import {BsFillPlayCircleFill} from "react-icons/bs";
import {MdArrowDropDown} from "react-icons/md";
import {FiCheck} from "react-icons/fi"
import {FaArrowCircleRight} from "react-icons/fa"
import {FaArrowCircleLeft} from "react-icons/fa"
import SliderList from "../assets/SliderContent"
import { Link,Outlet } from "react-router-dom";
import Recently from './Recently';
import Trending from './Trending';
import { Cookies, useCookies } from "react-cookie";
import {useNavigate} from "react-router-dom";
import {FiSearch} from "react-icons/fi";

function MainMenu({userId,songList,name,recentSongsList,logout}) {
  const navigate = useNavigate();
  const[songs,setSongs] = useState(null);
  const [cookies,setCookies,removeCookies] = useCookies([]);
  const [isLogout,setLogout] = useState(false);
  const [searchTerm,setSearchTerm] = useState("");

  const handleSubmit =(e)=>{
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  }

  //slider state hook
  const[slideIndex,setSlideIndex] = useState(1);
    const nextSlide = ()=>{
      if(slideIndex !== SliderList.length){
        setSlideIndex(slideIndex+1);
      }else if(slideIndex===SliderList.length){
        setSlideIndex(1);
      }
      // console.log(slideIndex+" next");
    }
    const prevSlide = ()=>{
       if(slideIndex !==1){
         setSlideIndex(slideIndex-1);
       }else if(slideIndex===1){
         setSlideIndex(SliderList.length);
       }
      //  console.log(slideIndex+" prev");
    }
  
  
  const[loginPopup,setLoginPopup] = useState(false);

  const handleSongArray = (arr,i) =>{
    return songList(arr,i);
  }

  const handleLogout = async()=>{
    setLoginPopup(true);
    removeCookies("jwt");
    // got to main login/signup page
    return logout();
  }

  return (
    <div className="mn_menu">
      <div className="sliderContainer">
         <div className="topEffect">
         <form onSubmit={handleSubmit}>
         <i><FiSearch /></i>
         <input className="search-input" type="text" placeholder="What do you want to hear!!" onChange={(e)=>setSearchTerm(e.target.value)}/>
         </form>
         <div className="lg-sg">
           <a href="#" onClick={()=>setLogout(prevValue => !prevValue)}>{name?name:"MusixON"}</a>
           { isLogout ? <a href="#" id="logout-btn" onClick={handleLogout}>Logout</a> : null}
         </div>
        </div>
          {
            SliderList && SliderList.map((obj,index)=>(
              <div className={slideIndex===index+1 ? "slides fade" : "slide"} key={obj.id}>
              <img src={obj.img} alt="pic" className="slider-img rmvFltr"/>

             <div className="slideContent">
                 <div className="middle">
                    {/* <i onClick={prevSlide}><FaArrowCircleLeft/></i> */}
                    <h1>{obj.text}</h1>
                    {/* <i onClick={nextSlide}><FaArrowCircleRight/></i> */}
                 </div>
                 <div className="bottom">
                    <Link id="btm1" to={`/Home/AroundYou`}>
                      <i><BsFillPlayCircleFill/></i>
                      <span>Play</span>
                    </Link>
                    {/* <a href="#" id="btm2">
                      <i><FiCheck/></i>
                      <span>Follow</span>
                    </a> */}
                 </div>
              </div>
              </div>
              ))
            }
        <div className="btmEffect"></div>
      </div>
      <div className="songs-container">
        <Trending songArray={handleSongArray}/>
        { recentSongsList ? <Recently songArray={handleSongArray} recentList={recentSongsList}/> : null}
        </div>   
    </div>
  )
}

export default MainMenu;