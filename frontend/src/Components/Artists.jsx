import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Styles_sheet/Artists.css";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { Cookies, useCookies } from "react-cookie";
import axios from "axios";
import { useGetTopChartsQuery } from "../redux/services/ShazamCore";
import { Link } from "react-router-dom";
import Loader from "../assets/Loader";
import Error from "../assets/Error";

function Artists({ songList, userId }) {
  const { data, isFetching, error } = useGetTopChartsQuery();
  //console.log(data);

  const [shw, setShw] = useState(true);
  const [singerName, setSingerName] = useState(null);
  const [singerImage, setSingerImage] = useState(null);
  const [songs, setSongs] = useState();
  const [cookies, removeCookies] = useCookies([]);
  const [likedSong, setLikedSong] = useState();
  const [text,setText] = useState("See All");
  const [size,setSize] = useState(6);

  useEffect(() => {
    const func = async () => {
      if (!cookies.jwt) {
        console.log("user not present");
      } else {
        const { data } = await axios.post(
          "http://localhost:5000/giveLikedSong",
          { id: userId },
          { withCredentials: true }
        );
        let arr = data.likedSongList;
        setLikedSong(() => arr);
      }
    };
    func();
  }, [cookies]);
  if (isFetching) return <Loader title="Loading Artists" />;
  if (error) return <Error />;

  const handleClick = (singer_name, singer_img, song) => {
    setSingerName(singer_name);
    setSingerImage(singer_img);
    setSongs(song);
    if (singerName !== null && songs !== null && singerImage !== null) {
      setShw(false);
    }
  };

  const handleAllArtist = () =>{
    if(text==="See All"){
      setText("See Less")
      setSize(data.length);
    }else{
      setText("See All")
      setSize(6);
    }
  }

  return (
    <div className="artist-container">
      <div className="top-picture">
        <img
          src="https://media.istockphoto.com/photos/guitar-player-on-dark-picture-id643965600?b=1&k=20&m=643965600&s=170667a&w=0&h=VyCHYbffCMdOxiXfP1hCIXKStdwQFEf1jISSefILzC4="
          alt="pic"
        />
        <div className="top-name">
          <h2>Top Artists</h2>
        </div>
        <div className="btm-effect"></div>
      </div>
      <div className="artist-section">
        <h2 id="top-artist-sec">Listen Our Top Artists
          <span id="clk-see-all" onClick={handleAllArtist}>{text}</span>
        </h2>
        <div className="artist-card">
          {data &&
            data.slice(0, size).map((obj, idx) => (
              <Link to={`/artists/${obj?.artists? obj.artists[0].adamid : null}`} key={idx}>
                <div className="artist">
                  <img src={obj?.images?.background ? obj.images.background : ""} alt="pic" />
                  <i>
                    <BsFillPlayCircleFill />
                  </i>
                  <h3 id="name">{obj?.subtitle? obj.subtitle : "songName"}</h3>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Artists;