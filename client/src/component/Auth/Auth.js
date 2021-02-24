import React, { useState, useEffect } from "react";
import "../../index.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { clean, login } from "../../actions/auth";
import FacebookLogin from "react-facebook-login";
import axios from "axios";

const Auth = ({ login, isAuthencticated, error, clean }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    clean();
  }, []);

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
    <>
      <div className="register">
        <div className="container2">
          <h1 className="logo">Social</h1>
          <div>
            <form>
              <input
                className="regInp"
                type="email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                placeholder="email"
              ></input>
              <input
                className="regInp"
                type="password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                placeholder="password"
              ></input>
            </form>
          </div>

          <div
            style={{
              backgroundColor: "skyblue",
              textAlign: "center",
              width: "70%",
              margin: "1em auto",
              cursor: "pointer",
            }}
            onClick={(e) => onSubmit(e)}
          >
            Log In
          </div>
          {error && (
            <p
              style={{
                fontSize: "0.8rem",
                textAlign: "center",
                width: "70%",
                margin: "0 auto",
                color: "red",
              }}
            >
              {error}
            </p>
          )}
          <Link
            style={{
              fontSize: "0.8rem",
              textAlign: "center",
              width: "70%",
              margin: "0 auto",
            }}
            to="/forgetpass"
          >
            forget password?
          </Link>
        </div>
      </div>
      <div className="container1">
        <div>
          <p style={{ display: "inline" }}>Don't have an account? </p>
          <Link to="/register" style={{ color: "lightblue" }}>
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthencticated: state.auth.isAuthencticated,
    error: state.auth.errorMsg,
  };
};

export default connect(mapStateToProps, { login, clean })(Auth);
