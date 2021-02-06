import React from "react";
import "./Post.css";

const Post = ({ detail }) => {
  console.log(detail);
  const url = detail.image.split("\\")[1];
  console.log(url);

  return (
    <div className="postCard">
      <div className="postCard1">
        <p>Om Fuke</p>
      </div>
      <div
        className="postCard2"
        style={{
          background: `url(/${url})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="postCard3">{detail.likes}</div>
    </div>
  );
};

export default Post;
