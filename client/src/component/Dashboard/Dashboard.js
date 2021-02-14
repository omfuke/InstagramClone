import React, { useEffect, Fragment, useState } from "react";
import { logout, clearProfile } from "../../actions/auth";
import { connect } from "react-redux";

import { Redirect, Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";
import Navbar from "../../layout/Navbar";
import Spinner from "../../Spinner/Spinner";
import "./Dashboard.css";
import axios from "axios";
import { getPosts } from "../../actions/post";
import Post from "../Post/Post";
import Upload from "../../layout/Upload";

const Dashboard = ({
  logout,
  clearProfile,
  isAuthencticated,
  loading,
  getCurrentProfile,
  profile,
  getPosts,
  posts,
}) => {
  const [post, setPost] = useState(false);

  if (posts) {
    const images = posts.filter((p) => p.length > 0);
    console.log(images);
  }

  const logOutHandler = () => {
    logout();
    clearProfile();
  };

  useEffect(() => {
    getCurrentProfile();

    getPosts();
  }, [getCurrentProfile, getPosts]);

  if (!isAuthencticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <Navbar />
      {post && (
        <div
          onClick={() => setPost(!post)}
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
      <div className="posts">
        <div className="post">
          <div className="postItem">
            <i
              class="fas fa-plus-square fa-2x"
              onClick={() => setPost(!post)}
            ></i>
          </div>
          {!posts ? (
            <div>
              <div className="postItem1">Posts for you</div>
              <div className="postItem">
                <i className="fas fa-camera fa-4x"></i>
              </div>
              <div className="postItem">
                <div>No Posts Yet</div>
              </div>
            </div>
          ) : (
            <div>
              <div className="postItem1">Posts for you</div>

              {posts.map((p) => (
                <Post detail={p} />
              ))}
            </div>
          )}
        </div>
      </div>
      {post && <Upload />}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthencticated: state.auth.isAuthencticated,
    loading: state.profile.loading,
    profile: state.profile.profile,
    posts: state.post.posts,
  };
};

export default connect(mapStateToProps, {
  logout,
  clearProfile,
  getCurrentProfile,
  getPosts,
})(Dashboard);
