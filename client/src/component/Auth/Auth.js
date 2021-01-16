import React from "react";
import "./Auth.css";

const Auth = () => {
  return (
    <div>
      <div className="container">
        <h1>Instagram Clone</h1>
        <div className="box">
          <input className="input" placeholder="email"></input>
          <input className="input" placeholder="password"></input>
        </div>
        <button>Log In</button>
      </div>
      <div className="container1">
        <div>
          <p style={{ display: "inline" }}>Don't have an account? </p>
          <a style={{ color: "lightblue" }}>Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
