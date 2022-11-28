import React, { useState } from "react";
import ReactDOM from "react-dom";
import GoogleLogin from "react-google-login";
import OtpPage from "./OtpPage";
import { AiOutlineClose } from "react-icons/ai";
import ForgotPassword from "./ForgotPassword";
import "../Styles_sheet/Login.css";
import axios from "axios";

function Login({ open, close, home }) {

  const [forget,setForget] = useState(false);
  const [otpPage,setOtpPage] = useState(false);
  const [otp,setOtp] = useState(false);

  const responseSuccessGoogle = async (response) => {
    console.log(response);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/googlelogin",
        {
          tokenId: response.tokenId,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      if (data) {
        if (data.errors) {
          // handel error...
          console.log("In corrcet credentials.");
        } else {
          // go to home page..
          console.log("you can go home");
          return home(loginData);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const responseErrorGoogle = (response) => {
    console.log(response);
  };

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    try {
      console.log(email, password);
      const { data } = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      if (data) {
        if (data.errors) {
          console.log("In correct Credentials");
        } else {
          // move to protected routes.. profile or something
          // return home("home");
          return home(loginData);
        }
      }
    } catch (err) {
      console.log(err);
    }
    return close();
  };

  if (!open) return null;
  return ReactDOM.createPortal(
    <>
    { !otpPage ? <form className="overLay" onSubmit={handleSubmit}>
      <div className="lg-container">
        <div className="top-lg">
          <img
            src="https://w0.peakpx.com/wallpaper/451/187/HD-wallpaper-billie-eilish-billie-eilish-thumbnail.jpg"
            alt="img"
            className="avatar-img"
          />
          <i className="lg-tp-icon" onClick={() => close()}>
            <AiOutlineClose />
          </i>
        </div>
        <h2 className="h2-top">Get Started</h2>
        <div className="lg">
          <h2 className="h2-lg">Email</h2>
          <input
            className="input-margin"
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />
        </div>
        <div className="lg">
          <h2 className="h2-lg">Password</h2>
          <input
            className="input-margin"
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />
        </div>
        <div className="lg">
          <input type="submit" value="Login" className="lg-sub" />
        </div>
        <div>
          <GoogleLogin
            className="google-login"
            clientId="634193116808-mhg7vbt3hph1bg2sb0sfia6skijf3o71.apps.googleusercontent.com"
            buttonText="Login with google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <div className="btm-content">
          <p>password ?</p>
          <a href="#" onClick={()=>setOtpPage(true)}>forgotPassword</a>
        </div>
      </div>
    </form> : <OtpPage close={()=>setOtpPage(false)}/> } 
    </>,
    document.getElementById("portal1")
  );
}

export default Login;
