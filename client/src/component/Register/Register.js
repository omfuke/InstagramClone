import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { name, email, password } = formData;

  const onSubmit = () => {
    console.log(formData);
  };

  return (
    <div>
      <div className="container2">
        <h1>Instagram Clone</h1>
        <p
          style={{
            textAlign: "center",
            color: "#8e8e8e",
            fontSize: "17px",
            margin: "0 40px 10px",
          }}
        >
          Sign up to see photos and videos from your friends.
        </p>
        <div className="box">
          <input
            className="input"
            type="email"
            name="email"
            value={email}
            placeholder="email"
            onChange={(e) => onChange(e)}
          ></input>
          <input
            className="input"
            type="text"
            name="name"
            value={name}
            placeholder="username"
            onChange={(e) => onChange(e)}
          ></input>
          <input
            className="input"
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={(e) => onChange(e)}
          ></input>
        </div>
        <button onClick={onSubmit}>Sign up</button>
        <p style={{ fontSize: "0.8rem", textAlign: "center" }}>
          By signing up, you agree to our Terms , Data Policy and Cookies Policy
          .
        </p>
      </div>
      <div className="container3">
        <div>
          <p style={{ display: "inline" }}>Have an account? </p>
          <Link to="/" style={{ color: "lightblue" }}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Register;
