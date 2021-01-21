import React, { useEffect } from "react";
import { logout, clearProfile } from "../../actions/auth";
import { connect } from "react-redux";
import spinner from "./833.gif";
import { Redirect } from "react-router";
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
        <h1>hello</h1>
      )}

      {!profile ? <p>pls create profile</p> : <p>{profile.name}</p>}
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
