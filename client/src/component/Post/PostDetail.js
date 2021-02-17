import axios from "axios";
import React, { useState, useEffect } from "react";
import "./PostDetail.css";

const PostDetail = ({ match }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`/api/post/otherPost/${match.params.postId}`);
      console.log(res.data);
      setPost(res.data);
    }
    fetchData();
  }, []);

  return (
    <div className="postDetail">
      {post && (
        <div className="postDetail2">
          <div className="postDetailImg">
            <img
              className="postDetailImg1"
              src={`/${post.image.split("\\")[1]}`}
            />
          </div>
          <div className="postDetailCom">
            {post.comments.map((c) => (
              <div className="comments">
                <div
                  style={{
                    fontSize: "1rem",
                    wordBreak: "break-all",
                  }}
                >
                  <span style={{ fontWeight: "700", fontSize: "1rem" }}>
                    {c.name}
                    {"  "}
                  </span>
                  {c.comment}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
