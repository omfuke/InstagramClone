import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { getCurrentProfile } from "../actions/profile";
import "./profile.css";
import PersonImg from "../OtherUsers/l60Hf.png";
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
    const res = await axios.post(
      "https://social-pics.herokuapp.com/api/profile",
      formData
    );
    closeEvent();
    getCurrentProfile();
  };

  if (!isAuthencticated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Navbar />
      {image && (
        <div
          onClick={() => {
            setImage(!image);
            setP(false);
          }}
          style={{
            position: "fixed",
            zIndex: "9",
            backgroundColor: "rgb(0,0,0,0.3)",
            top: "0",
            width: "100%",
            height: "100%",
          }}
        ></div>
      )}
      <div className="OtherProfile">
        <div className="profileHeader">
          <div className="profile">
            {profile.profile.profileImage ? (
              <div>
                <img
                  src={profile.profile.profileImage}
                  onClick={() => setImage(!image)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
            ) : (
              <div onClick={() => setImage(!image)}>
                <img
                  src={PersonImg}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
            )}
          </div>

          {profile.profile && profile.post && (
            <div className="profileDetail">
              <div className="profileDetail1">
                <span className="profileUser" style={{ marginLeft: "1em" }}>
                  {user.name}
                </span>
                <Link
                  style={{
                    marginLeft: "1em",
                    border: "1px solid #e8e8e8",
                    padding: "0.5em",
                    textDecoration: "none",
                    color: "black",
                  }}
                  to="/edit-profile"
                >
                  Edit Profile
                </Link>
              </div>
              <div style={{ marginTop: "1em" }}>
                <span style={{ marginLeft: "1em" }}>
                  {profile.post.length} : posts
                </span>
                <span style={{ marginLeft: "2em" }}>
                  {profile.profile.followers.length} : followers
                </span>
                <span style={{ marginLeft: "2em" }}>
                  {profile.profile.following.length} : following
                </span>
              </div>
              <div>
                {profile.profile.bio && (
                  <p style={{ marginLeft: "1em" }}>{profile.profile.bio}</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="profilePosts">
          {profile.post.map((p) => (
            <Link
              to={`/post/${p._id}`}
              className="profilePosts1"
              style={{
                background: `url(${p.image}) no-repeat center/cover`,
              }}
            >
              <div className="profilePosts2">
                <i
                  style={{ color: "white", marginRight: "0.5em" }}
                  class="fas fa-heart"
                ></i>
                {p.likes.length}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {image && (
        <div className="uploadImg">
          <div className="uploadImg1">
            <div>
              <label
                htmlFor="files"
                style={{
                  padding: "0.5em",
                  borderRadius: "2%",
                  backgroundColor: "skyblue",
                  color: "white",
                  cursor: "pointer",
                }}
              >
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
              <div
                style={{
                  backgroundColor: "tomato",
                  padding: "0.5em",
                  borderRadius: "2%",
                  cursor: "pointer",
                }}
                onClick={() => setImage(!image)}
              >
                Close
              </div>
            </div>
          </div>
        </div>
      )}
      {p && (
        <div className="uploadImg">
          <div className="uploadImg1">
            <div>
              <label
                htmlFor="files"
                style={{
                  padding: "0.5em",
                  borderRadius: "2%",
                  backgroundColor: "skyblue",
                  color: "white",
                  cursor: "pointer",
                }}
              >
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
              <div
                style={{
                  backgroundColor: "lightgreen",
                  padding: "0.5em",
                  borderRadius: "2%",
                  cursor: "pointer",
                }}
                onClick={() => showImage()}
              >
                Set Image
              </div>
            </div>
          </div>
        </div>
        // <div className="uploadImg2">
        //   <button className="btn btn-primary" onClick={() => showImage()}>
        //     upload
        //   </button>
        // </div>
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
