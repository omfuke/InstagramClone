import React, { useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";

const Auth = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const onSubmit = () => {
    console.log(formData);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, password } = formData;

  return (
    <div>
      <div className="container">
        <h1>Instagram Clone</h1>
        <div className="box">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            className="input"
            placeholder="email"
          ></input>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            className="input"
            placeholder="password"
          ></input>
        </div>
        <button onClick={onSubmit}>Log In</button>
      </div>
      <div className="container1">
        <div>
          <p style={{ display: "inline" }}>Don't have an account? </p>
          <Link to="/register" style={{ color: "lightblue" }}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
