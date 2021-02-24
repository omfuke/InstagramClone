import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { connect } from "react-redux";
import { logout, clearProfile } from "../actions/auth";

const Navbar = ({ logout, clearProfile }) => {
  const logOutHandler = () => {
    logout();
    clearProfile();
  };
  return (
    <div className="nav">
      <div className="navbar">
        <Link
          style={{ textDecoration: "none", cursor: "pointer" }}
          className="navhead"
          to="/"
        >
          <p>Social</p>
        </Link>
        <div className="navlinks">
          <Link className="navlink" to="/all-profiles">
            <i
              style={{ color: "black" }}
              className="fas fa-globe-asia fa-2x"
            ></i>
          </Link>
          <Link className="navlink" to="/profile">
            <i
              style={{ color: "black" }}
              className="fas fa-user-circle fa-2x"
            ></i>
          </Link>
          <Link onClick={logOutHandler} className="navlink" to="/profile">
            <i style={{ color: "black" }} class="fas fa-sign-out-alt fa-2x"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { logout, clearProfile })(Navbar);
