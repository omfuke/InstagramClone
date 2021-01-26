import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link className="navlink" to="/profile">
        <i className="fas fa-user-circle fa-2x"></i>
      </Link>
    </div>
  );
};

export default Navbar;
