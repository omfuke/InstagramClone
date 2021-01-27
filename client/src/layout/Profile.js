import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { getCurrentProfile } from "../actions/profile";
import "./profile.css";
import Upload from "./Upload";

const Profile = ({ profile, getCurrentProfile }) => {
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
          <p>hello {profile.name}</p>
          <p>hello {profile.bio}</p>
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
  return { profile: state.profile.profile };
};

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
