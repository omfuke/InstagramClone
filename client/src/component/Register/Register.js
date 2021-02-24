import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Register.css";
import { connect } from "react-redux";
import { register, clean } from "../../actions/auth";

const Register = ({ clean, register, isAuthencticated, error }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    clean();
  }, []);

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
    <>
      <div className="register">
        <div className="container2">
          <h1>Social</h1>
          <p
            style={{
              textAlign: "center",
              color: "#8e8e8e",
              fontSize: "17px",
              margin: "1em  1em",
            }}
          >
            Sign up to see photos from your friends.
          </p>
          <div>
            <form>
              <input
                className="regInp"
                type="email"
                name="email"
                value={email}
                placeholder="email"
                onChange={(e) => onChange(e)}
              />
              {error && (
                <div className="inputVal">
                  {error.email != undefined && error.email.msg}
                </div>
              )}

              <input
                autoComplete={"off"}
                className="regInp"
                type="text"
                name="name"
                value={name}
                placeholder="username"
                onChange={(e) => onChange(e)}
              />
              {error && (
                <div className="inputVal">
                  {error.name != undefined && error.name.msg}
                </div>
              )}
              <input
                autoComplete={"off"}
                className="regInp"
                type="password"
                name="password"
                value={password}
                placeholder="password"
                onChange={(e) => onChange(e)}
              ></input>
              {error && (
                <div className="inputVal">
                  {error.password != undefined && error.password.msg}
                </div>
              )}

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
                Sign up
              </div>
            </form>
          </div>
          <p
            style={{
              fontSize: "0.8rem",
              textAlign: "center",
              width: "70%",
              margin: "0 auto",
            }}
          >
            By signing up, you agree to our Terms , Data Policy and Cookies
            Policy .
          </p>
        </div>
      </div>
      <div className="container3">
        <div>
          <p style={{ display: "inline" }}>Have an account? </p>
          <Link to="/" style={{ color: "lightblue" }}>
            Log in
          </Link>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthencticated: state.auth.isAuthencticated,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps, { register, clean })(Register);
