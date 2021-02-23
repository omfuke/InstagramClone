import React, { useState, useEffect } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { updateLikes } from "../../actions/post";
import { connect } from "react-redux";
import { imageClipper } from "image-clipper";
import { getPosts } from "../../actions/post";
import ProfileImg from "../../OtherUsers/l60Hf.png";

const Post = ({ detail, updateLikes, user, post, getPosts }) => {
  const url = detail.image.split("\\")[1];
  const [User, setUser] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [comment, setComment] = useState("");

  const like =
    detail.likes.filter((l) => l.user === user._id).length > 0 ? true : false;

  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };

  const onPostHandler = async (e) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ comment });
    if (comment) {
      const response = await axios.post(
        `/api/post/comment/${detail._id}`,
        body,
        config
      );
      console.log(response.data);
      setComment("");
      getPosts();
    } else {
      return;
    }
  };

  useEffect(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ user: detail.user });

    const res = await axios.post("api/post/user", body, config);

    setUser(res.data.name);
    setUserImg(res.data.profileImage);
  }, []);

  return (
    <div className="postCard">
      <div className="postCard1">
        {userImg ? (
          <div>
            <img
              src={`/${userImg.split("\\")[1]}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>
        ) : (
          <div>
            <img
              src={ProfileImg}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>
        )}

        {User && (
          <Link to={`/profile/${User}`}>
            <p>{User}</p>
          </Link>
        )}
      </div>
      <div className="postCard2">
        <img
          id="preview"
          src={`/${url}`}
          style={{
            //  backgroundImage: `url(/${url})`,

            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      <div className="postCard3">
        <div
          onClick={() => updateLikes(detail._id, user._id)}
          style={{
            backgroundColor: like ? "lightblue" : "tomato",
            padding: "0.5em",
            color: like ? "white" : "white",
          }}
        >
          Likes <span>{detail.likes.length}</span>
        </div>
      </div>

      <div className="comments">
        {detail.comments.map((p) => (
          <div style={{ fontSize: "0.8rem", wordWrap: "break-word" }}>
            <span style={{ fontWeight: "700", fontSize: "0.8rem" }}>
              {p.name}
              {"  "}
            </span>
            {p.comment}
          </div>
        ))}
      </div>

      <div className="postCard4">
        <div>
          <textarea
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                e.preventDefault();
              }
            }}
            onChange={(e) => onChangeHandler(e)}
            type="text"
            placeholder="Add a comment"
            value={comment}
            style={{
              border: "none",
              display: "inline",
              flexBasis: "80%",
              overflowWrap: "break-word",
            }}
          ></textarea>
          <button
            onClick={(e) => onPostHandler(e)}
            style={{
              display: "inline",
              flexBasis: "20%",
              backgroundColor: "white",
              color: comment ? "blue" : "skyblue",
              border: "none",
              cursor: comment ? "pointer" : "default",
            }}
          >
            Post
          </button>
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

export default connect(mapStateToProps, { updateLikes, getPosts })(Post);
