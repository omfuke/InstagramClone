import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { connect } from "react-redux";
import { logout } from "../actions/auth";

const Navbar = ({ logout }) => {
  const logOutHandler = () => {
    logout();
  };
  return (
    <div className="nav">
      <div className="navbar">
        <Link className="navhead" to="/">
          <p>Instagram</p>
        </Link>
        <div className="navlinks">
          <Link className="navlink" to="/all-profiles">
            <i className="fas fa-globe-asia fa-2x"></i>
          </Link>
          <Link className="navlink" to="/profile">
            <i className="fas fa-user-circle fa-2x"></i>
          </Link>
          <Link onClick={logOutHandler} className="navlink" to="/profile">
            <i class="fas fa-sign-out-alt fa-2x"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { logout })(Navbar);
