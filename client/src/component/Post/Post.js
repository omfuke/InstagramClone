import React, { useState, useEffect } from "react";
import "./Post.css";
import axios from "axios";
import { updateLikes } from "../../actions/post";
import { connect } from "react-redux";

const Post = ({ detail, updateLikes, user, post }) => {
  const url = detail.image.split("\\")[1];

  const [like, setLike] = useState(false);

  return (
    <div className="postCard">
      <div className="postCard1">
        <p>{detail._id}</p>
      </div>
      <div
        className="postCard2"
        style={{
          background: `url(/${url})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="postCard3">
        <div
          onClick={() => updateLikes(detail._id, user._id)}
          style={{ color: like ? "blue" : "red" }}
        >
          Likes {detail.likes.length}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    post: state.post.posts,
  };
};

export default connect(mapStateToProps, { updateLikes })(Post);
