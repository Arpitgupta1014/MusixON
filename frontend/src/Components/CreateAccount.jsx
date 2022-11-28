import React, { useState, useEffect } from "react";
import Signup from "./Signup";
import Login from "./Login";
import "../Styles_sheet/CreateAccount.css";

function CreateAccount({ homePg }) {
  const [signUpPopup, setSignUpPopup] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);

  const handleHomePage = (obj) => {
    return homePg(obj);
  };

  return (
    <div className="create-container">
      <h3 id="heading">New To the MusixON ?</h3>
      <a href="#" className="create-btn" onClick={() => setSignUpPopup(true)}>
        Create Account
      </a>
      <Signup
        open={signUpPopup}
        close={() => setSignUpPopup(false)}
        home={handleHomePage}
      />
      <p>
        Already have an account ?
        <a href="#" className="login-btn" onClick={() => setLoginPopup(true)}>
          Login
        </a>
        <Login
          open={loginPopup}
          close={() => setLoginPopup(false)}
          home={handleHomePage}
        />
      </p>
    </div>
  );
}

export default CreateAccount;