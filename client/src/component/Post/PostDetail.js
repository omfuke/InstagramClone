import axios from "axios";
import React, { useState, useEffect } from "react";
import "./PostDetail.css";
import { getCurrentProfile } from "../../actions/profile";
import { connect } from "react-redux";

const PostDetail = ({ match, getCurrentProfile }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(
        `https://social-pics.herokuapp.com/api/post/otherPost/${match.params.postId}`
      );
      console.log(res.data);
      setPost(res.data);
    }
    fetchData();
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        height: "100vh",
      }}
    >
      {post && (
        <div
          style={{
            maxWidth: "600px",

            height: "80vh",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "black",
            border: "1px solid #e8e8e8",
          }}
        >
          <img
            style={{ objectFit: "contain", height: "100%", maxHeight: "80vh" }}
            src={post.image}
          />
        </div>
      )}
    </div>
  );
};

export default connect(null, { getCurrentProfile })(PostDetail);
