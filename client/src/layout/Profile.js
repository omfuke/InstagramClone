import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { getCurrentProfile } from "../actions/profile";
import "./profile.css";
import Upload from "./Upload";
import { Redirect } from "react-router";
import axios from "axios";

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
              <span className="btn btn-primary" style={{ marginLeft: "1em" }}>
                Create Profile
              </span>
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
      {profile && (
        <div>
          <div>
            {dp ? (
              <div
                onClick={() => setImage(!image)}
                className="profile-img"
                style={{ background: `url("${dp}") no-repeat center/cover` }}
              ></div>
            ) : (
              <div className="profile-img" onClick={() => setImage(!image)}>
                <i className="fal fa-camera fa-3x"></i>
              </div>
            )}

            <div className="profile">
              <h3> {profile.name}</h3>
              <p> {profile.bio}</p>
              <p>followers: {profile.followers.length}</p>
              <p>following: {profile.following.length}</p>
            </div>
          </div>

          <h2>Posts:</h2>
          {/* 
          <div>{post.text}</div>
          <p>likes: {post.likes.length}</p> */}
        </div>
      )}
      {image && <Upload dpHandler={dpHandler} closeEvent={closeEvent} />}
      {image && (
        <div className="overlay" onClick={() => setImage(!setImage)}></div>
      )}
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
