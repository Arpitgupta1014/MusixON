import React , {useEffect , useState} from 'react';
import  {GiMusicSpell}  from "react-icons/gi";
import  {BsThreeDots}  from "react-icons/bs";
import "../Styles_sheet/leftSidebar.css";
import NavBarList from '../assets/NavBarList';
import { Link } from "react-router-dom"
import Artists from './Artists';
import MainMenu from './MainMenu';
import MyPlaylist from './MyPlaylist';
import {Cookies, useCookies} from 'react-cookie';
import axios from 'axios';

function Home({userId}) {
  const [cookies,removeCookies] = useCookies([]);
  const [userList,setUserList] = useState([]);
  //Adding active class on the navbars
  useEffect(()=>{
    const allAnchor = document.querySelector(".lf_menu .sectionContainer").querySelectorAll("a");
       
    function changeActive(){
      allAnchor.forEach((i)=>i.classList.remove("active"));
      this.classList.add("active");
    }
    
    allAnchor.forEach((i)=>i.addEventListener("click",changeActive));
  },[]);

  const handleUserPlaylist = () =>{
    console.log("created");
    let arr = userList;
    let obj = {
      id : arr.length+1,
      name : `Sample-${arr.length+1}`
    }
    arr.push(obj);
    setUserList(arr);
  }

  return(
    <div className="lf_menu">
      
      {/* Logo section */}

      <div className="logoContainer">
         <i className="first-logo"><GiMusicSpell /></i>
         <h2>MusixON</h2>
         <i className="second-logo"><BsThreeDots /></i>
      </div>
      
      {/* This section conatins various navigation bar links */}
      <div className="sectionContainer">
      {
        NavBarList && NavBarList.map((obj)=>(
          <div className="chSecContaier" key={obj.id}>
          { obj.name!="CreatePlaylist" ?  <Link to={`/${obj.name}`}>
          <i className='sec-logo'> {obj.icon} </i>
          <span className="sec-head"> {obj.name} </span>
          </Link> :
          <>
           <i className='sec-logo'> {obj.icon} </i>
           <span className="sec-head" onClick={handleUserPlaylist} style={{"cursor":"pointer"}} > {obj.name} </span>
          </>
          }
          </div>
        ))
      }
      <MyPlaylist userList={userList}/>
      </div>
    </div>
  );
}

export default Home;