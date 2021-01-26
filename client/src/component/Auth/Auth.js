import React, { useState } from "react";
import "../../index.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

const Auth = ({ login, isAuthencticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, password } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthencticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="container0">
      <div className="container">
        <h1 className="logo">Instagram Clone</h1>
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
        <button onClick={(e) => onSubmit(e)}>Log In</button>
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

const mapStateToProps = (state) => {
  return { isAuthencticated: state.auth.isAuthencticated };
};

export default connect(mapStateToProps, { login })(Auth);
