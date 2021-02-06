import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { getCurrentProfile } from "../actions/profile";
import "./profile.css";
import Upload from "./Upload";
import { Redirect } from "react-router";

import { Link } from "react-router-dom";

const Profile = ({
  profile,
  user,
  getCurrentProfile,
  isAuthencticated,
  post,
}) => {
  const [image, setImage] = useState(false);
  const [dp, setDp] = useState(null);
  const [p, setP] = useState([]);

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const closeEvent = () => {
    setImage(!image);
  };

  const dpHandler = (url) => {
    setDp(url);
  };
  if (!isAuthencticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Navbar />
      <div className="profileHeader">
        <div className="profile">
          <div className="profileImg">
            <div></div>
          </div>
          <div className="profileDetail">
            <div className="profileDetail1">
              <span className="profileUser" style={{ marginLeft: "1em" }}>
                {user.name}
              </span>
              <Link to="/create-profile">
                <span className="btn btn-primary" style={{ marginLeft: "1em" }}>
                  Create Profile
                </span>
              </Link>
            </div>
            <div>
              <span style={{ marginLeft: "1em" }}>0 : posts</span>
              <span style={{ marginLeft: "2em" }}>0 : followers</span>
              <span style={{ marginLeft: "2em" }}>0 : following</span>
            </div>
            <div>
              <p style={{ marginLeft: "1em" }}>VJTIAN messi of VJTI</p>
            </div>
          </div>
        </div>
      </div>
      <div className="profilePosts">
        <div></div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isAuthencticated: state.auth.isAuthencticated,
    profile: state.profile.profile,
    post: state.profile.posts,
  };
};

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
