import React, { useEffect } from "react";
import { logout, clearProfile } from "../../actions/auth";
import { connect } from "react-redux";
import spinner from "./833.gif";
import { Redirect, Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";

const Dashboard = ({
  logout,
  clearProfile,
  isAuthencticated,
  loading,
  getCurrentProfile,
  profile,
}) => {
  const logOutHandler = () => {
    logout();
    clearProfile();
  };

  useEffect(() => {
    getCurrentProfile();
  }, []);

  if (!isAuthencticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1 onClick={logOutHandler}>Logout</h1>
      {loading ? (
        <img src={spinner} width="100" height="100" alt="om" />
      ) : (
        <div>
          <h1>hello</h1>
        </div>
      )}

      {!profile ? (
        <Link to="/create-profile" className="Button">
          Create Profile
        </Link>
      ) : (
        <p>{profile.name}</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthencticated: state.auth.isAuthencticated,
    loading: state.profile.loading,
    profile: state.profile.profile,
  };
};

export default connect(mapStateToProps, {
  logout,
  clearProfile,
  getCurrentProfile,
})(Dashboard);
