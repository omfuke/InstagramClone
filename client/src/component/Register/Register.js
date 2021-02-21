import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Register.css";
import { connect } from "react-redux";
import { register } from "../../actions/auth";

const Register = ({ register, isAuthencticated, error }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const emailErr = error && error.filter((e) => e.param === "email");
  const passErr = error && error.filter((e) => e.param === "password");

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { name, email, password } = formData;

  const onSubmit = (e) => {
    e.preventDefault();

    register({ name, email, password });
  };

  if (isAuthencticated) {
    return <Redirect to="/dashboard" />;
  }

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
          <form onSubmit={(e) => onSubmit(e)}>
            <input
              className="input"
              type="email"
              name="email"
              value={email}
              placeholder="email"
              onChange={(e) => onChange(e)}
            ></input>
            {error && <p>{error[0].msg}</p>}

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

            <button type="submit">Sign up</button>
          </form>
        </div>
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

const mapStateToProps = (state) => {
  return {
    isAuthencticated: state.auth.isAuthencticated,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps, { register })(Register);
