import React, { useEffect, Fragment } from "react";
import { logout, clearProfile } from "../../actions/auth";
import { connect } from "react-redux";
import spinner from "./833.gif";
import { Redirect, Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";
import Navbar from "../../layout/Navbar";
import Spinner from "../../Spinner/Spinner";

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
  }, [getCurrentProfile]);

  if (!isAuthencticated) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Navbar />
      <div className="posts">
        <h1 onClick={logOutHandler}>Logout</h1>
        {loading ? (
          <img src={spinner} width="100" height="100" alt="om" />
        ) : (
          <div>
            <h1>hello</h1>
            {profile && <h1>{profile.name}</h1>}
          </div>
        )}

        {!profile ? (
          <Link to="/create-profile" className="Button">
            Create Profile
          </Link>
        ) : (
          <Link to="/edit-profile" className="Button">
            Edit Profile
          </Link>
        )}
      </div>
    </Fragment>
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
