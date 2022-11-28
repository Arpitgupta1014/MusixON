import React,{useState,useEffect} from 'react';
import "../Styles_sheet/Login.css";
import { AiOutlineClose } from "react-icons/ai";

function ForgotPassword({backLogin}) {

   const [forgetPasswordData, setForgetPasswordData] = useState({
        email: "",
        newPassword: "",
        confirmPassword:""
      });
   
    function handleChange(e) {
      const { name, value } = e.target;
      setForgetPasswordData((preValue) => {
          return {
            ...preValue,
            [name]: value,
          };
        });
    }
   
    const handleSubmit = (e) => {
        e.preventDefault();
        return backLogin();
    };

  return (
    <form className="overLay" onSubmit={handleSubmit}>
      <div className="lg-container">
        <div className="top-lg">
          <img
            src="https://w0.peakpx.com/wallpaper/451/187/HD-wallpaper-billie-eilish-billie-eilish-thumbnail.jpg"
            alt="img"
            className="avatar-img"
          />
          <i className="lg-tp-icon" onClick={()=>backLogin()}>
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
          <h2 className="h2-lg">New Password</h2>
          <input
            className="input-margin"
            type="password"
            name="newPassword"
            placeholder="Enter New Password"
            onChange={handleChange}
          />
        </div>
        
        <div className="lg">
          <h2 className="h2-lg">Confirm Password</h2>
          <input
            className="input-margin"
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            onChange={handleChange}
          />
        </div>
        <div className="lg">
          <input type="submit" value="Submit" className="lg-sub" />
        </div>
      </div>
    </form>
  )
}

export default ForgotPassword;