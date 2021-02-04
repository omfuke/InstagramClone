import React, { useEffect, Fragment, useState } from "react";
import { logout, clearProfile } from "../../actions/auth";
import { connect } from "react-redux";
import spinner from "./833.gif";
import { Redirect, Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";
import Navbar from "../../layout/Navbar";
import Spinner from "../../Spinner/Spinner";
import "./Dashboard.css";
import axios from "axios";

const Dashboard = ({
  logout,
  clearProfile,
  isAuthencticated,
  loading,
  getCurrentProfile,
  profile,
}) => {
  const [post, setPost] = useState(false);
  const [file, setFile] = useState(null);
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

  const onChangeHandler = async (e) => {
    setFile(e.target.files[0]);
  };

  if (loading) {
    return <Spinner />;
  }

  const postHandler = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("/api/post", formData);
    return <Redirect to="/dashboard" />;
  };

  return (
    <Fragment>
      <Navbar />
      <div className="posts">
        <div className="post">
          <div className="postItem">
            <i
              class="fas fa-plus-square fa-2x"
              onClick={() => setPost(!post)}
            ></i>
          </div>
          <div className="postItem1">Posts for you</div>
          <div className="postItem">
            <i className="fas fa-camera fa-4x"></i>
          </div>
          <div className="postItem">
            <div>No Posts Yet</div>
          </div>
        </div>
      </div>
      {post && (
        <div className="postModal">
          <div className="postModal1">
            <p>Create Post</p>
            <i
              className="fas fa-times-circle fa-2x"
              onClick={() => setPost(false)}
            ></i>
          </div>
          <div className="postModal2">
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
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => postHandler()}
          >
            post
          </button>
        </div>
      )}

      {/* <div className="posts">
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
      </div> */}
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
