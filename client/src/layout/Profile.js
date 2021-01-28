import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { getCurrentProfile } from "../actions/profile";
import "./profile.css";
import Upload from "./Upload";

const Profile = ({ profile, getCurrentProfile, post }) => {
  const [image, setImage] = useState(false);

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const closeEvent = () => {
    setImage(!image);
  };

  return (
    <div className="profile-page">
      <Navbar />
      {profile ? (
        <div className="profile">
          <div className="profile-img">
            <i
              className="fal fa-camera fa-3x"
              onClick={() => setImage(!image)}
            ></i>
          </div>
          <h1>hello</h1>
          <p> {profile.name}</p>
          <p> {profile.bio}</p>
          <p>followers: {profile.followers.length}</p>
          <p>following: {profile.following.length}</p>
          <h2>Posts:</h2>

          <div>{post.text}</div>
          <p>likes: {post.likes.length}</p>
        </div>
      ) : (
        <p>No profile</p>
      )}
      {image && <Upload closeEvent={closeEvent} />}
      {image && (
        <div className="overlay" onClick={() => setImage(!setImage)}></div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { profile: state.profile.profile, post: state.profile.posts };
};

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
