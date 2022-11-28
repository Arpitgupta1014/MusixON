import React, { useState } from "react";
import ReactDOM from "react-dom";
import GoogleLogin from "react-google-login";
import { AiOutlineClose } from "react-icons/ai";
import "../Styles_sheet/Login.css";
import axios from "axios";

function Signup({ open, close, home }) {
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
        if (!data.created) {
          // handel error...
          console.log("In corrcet credentials.");
          alert("User Already Exists!!");
          return;
        } else {
          // return props.onChecked("profile");
          return home("home");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const responseErrorGoogle = (response) => {
    console.log(response);
  };

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setRegisterData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registerData.name.length === 0) {
      alert("Fields should not be empty");
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      alert("Password Does not match");
      return;
    } else {
      const { name, email, password } = registerData;
      console.log(registerData);

      try {
        const { data } = await axios.post(
          "http://localhost:5000/register",
          {
            name,
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
            // handel error...
            console.log("In corrcet credentials.");
            alert("User Already Exists!!");
          } else {
            // go to home page
            // return home("home");
            return home(registerData);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    return close();
  };

  if (!open) return null;
  return ReactDOM.createPortal(
    <form className="overLay" onSubmit={handleSubmit}>
      <div className="lg-container sg-container">
        <div className="top-lg">
          <img
            src="https://w0.peakpx.com/wallpaper/451/187/HD-wallpaper-billie-eilish-billie-eilish-thumbnail.jpg"
            alt="img"
            className="avatar-img sgavatar-img"
          />
          <i onClick={() => close()}>
            <AiOutlineClose />
          </i>
        </div>
        <h2>Get Started</h2>
        <div className="lg sg">
          <h2>Name</h2>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
          />
        </div>
        <div className="lg sg">
          <h2>Email</h2>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />
        </div>
        <div className="lg sg">
          <h2>Password</h2>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />
        </div>
        <div className="lg sg">
          <h2>Confirm Password</h2>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-Enter Password"
            onChange={handleChange}
          />
        </div>
        <div className="lg">
          <input type="submit" value="SignUp" />
        </div>
        <div>
          <GoogleLogin
            className="google-login"
            clientId="634193116808-mhg7vbt3hph1bg2sb0sfia6skijf3o71.apps.googleusercontent.com"
            buttonText="Signup with google"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    </form>,
    document.getElementById("portal2")
  );
}

export default Signup;
