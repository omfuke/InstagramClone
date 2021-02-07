import React, { useState } from "react";
import "./Post.css";
import axios from "axios";

const Post = ({ detail }) => {
  console.log(detail);
  const url = detail.image.split("\\")[1];
  console.log(url);
  const [like, setLike] = useState(false);

  const likeHandler = async (postId) => {
    console.log(postId);

    const res = await axios.get(`api/post/like/${postId}`);
    setLike(res.data.like);
    console.log(res);
  };

  return (
    <div className="postCard">
      <div className="postCard1">
        <p>{detail.user}</p>
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
          onClick={() => likeHandler(detail._id)}
          style={{ color: like ? "blue" : "red" }}
        >
          Like
        </div>
      </div>
    </div>
  );
};

export default Post;
