import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { getCurrentProfile } from "../actions/profile";
import "./profile.css";
import Upload from "./Upload";
import { Redirect } from "react-router";
import axios from "axios";

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
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [p, setP] = useState(false);

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  if (profile) {
    console.log(profile.post);
  }

  const onChangeHandler = (e) => {
    const selected = e.target.files[0];
    setFileData(e.target.files[0]);
    let reader = new FileReader();

    reader.onloadend = () => {
      setFile(reader.result);
      setP(true);
    };
    reader.readAsDataURL(selected);
  };
  const closeEvent = () => {
    setImage(!image);
    setP(!p);
  };

  // const dpHandler = (url) => {
  //   setDp(url);
  // };

  const showImage = async () => {
    const formData = new FormData();
    formData.append("file", fileData);
    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // };
    const res = await axios.post("/api/profile", formData);
    closeEvent();
    getCurrentProfile();
  };

  if (!isAuthencticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Navbar />
      <div className="profileHeader">
        <div className="profile">
          {profile.profile.profileImage ? (
            <div
              className="prof"
              onClick={() => setImage(!image)}
              style={{
                background: `url('/${
                  profile.profile.profileImage.split("\\")[1]
                }') no-repeat center/cover`,
              }}
            ></div>
          ) : (
            <div onClick={() => setImage(!image)}>
              <i className="fas fa-user-alt fa-4x"></i>
            </div>
          )}

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
        {profile.post.map((p) => (
          <div
            className="userProfile"
            style={{
              background: `url('/${
                p.image.split("\\")[1]
              }') no-repeat center/cover`,
            }}
          ></div>
        ))}
      </div>

      {image && (
        <div className="uploadImg">
          <div className="uploadImg1">
            <div>
              <label htmlFor="files" className="btn btn-primary">
                Upload
              </label>
              <input
                onChange={(e) => onChangeHandler(e)}
                id="files"
                type="file"
                style={{ display: "none" }}
              />
            </div>
            <div>
              <button
                className="btn btn-primary"
                onClick={() => setImage(!image)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {p && (
        <div className="uploadImg2">
          <button className="btn btn-primary" onClick={() => showImage()}>
            upload
          </button>
        </div>
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
