import React, { useState, useEffect } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { updateLikes } from "../../actions/post";
import { connect } from "react-redux";

const Post = ({ detail, updateLikes, user, post }) => {
  const url = detail.image.split("\\")[1];
  const [User, setUser] = useState(null);
  const [userImg, setUserImg] = useState(null);

  const like =
    detail.likes.filter((l) => l.user === user._id).length > 0 ? true : false;

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
        {userImg && (
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
        )}

        {User && (
          <Link to={`/profile/${User}`}>
            <p>{User}</p>
          </Link>
        )}
      </div>
      <div className="postCard2">
        <img
          src={`/${url}`}
          style={{
            backgroundImage: `url(/${url})`,

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
            color: like ? "blue" : "red",
          }}
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
