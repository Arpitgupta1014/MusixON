import React,{useState,useEffect} from 'react';
import "../Styles_sheet/Login.css";
import { AiOutlineClose } from "react-icons/ai";
import ForgotPassword from './ForgotPassword';

function OtpPage({close}) {
  
  const [otp,setOtp] = useState();
  const [forget,setForget] = useState(false);
  let rand;
  useEffect(()=>{
    const min = 100000;
    const max = 999999;
    rand = Math.floor(min + Math.random() * (max - min));
  },[])

  useEffect(()=>{
    setOtp(rand);
  },[otp])


  const handleSubmit = (e) =>{
    e.preventDefault();
    setForget(true);
  }

  return (
    <>
    { !forget ? <form className="overLay" onSubmit={handleSubmit}>
      <div className="lg-container lg-otp">
        <div className="top-lg">
          <img
            src="https://w0.peakpx.com/wallpaper/451/187/HD-wallpaper-billie-eilish-billie-eilish-thumbnail.jpg"
            alt="img"
            className="avatar-img"
          />
          <i className="otp-tp-icon" onClick={()=>close()}>
            <AiOutlineClose />
          </i>
        </div>
        <h2 className="otp-top">Get Started</h2>
        <div className="lg">
          <h2 className="h2-lg">OTP</h2>
          <input
            className="input-margin"
            type="number"
            name="OTP"
            placeholder="Enter Otp"
            //onChange={handleChange}
          />
        </div>

        <div className="lg">
          <input type="submit" value="Submit" className="lg-sub" />
        </div>
      </div>
    </form> : <ForgotPassword backLogin={()=>close()}/>}
    </>
  )
}

export default OtpPage;