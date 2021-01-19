import React from "react";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router";

const Dashboard = ({ logout, isAuthencticated }) => {
  const logOutHandler = () => {
    logout();
  };

  if (!isAuthencticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1 onClick={logOutHandler}>Logout</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isAuthencticated: state.auth.isAuthencticated };
};

export default connect(mapStateToProps, { logout })(Dashboard);
