import React from "react";
import { Link } from "react-router-dom";
import "./OtherUsers.css";

const OtherUsers = ({ name, url }) => {
  console.log(url);
  return (
    <div className="UsersCard">
      <div className="UserCardImg">
        {url ? (
          <img
            src={url}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        ) : (
          <div className="UserCardImg">
            <i className="far fa-user-circle fa-2x"></i>
          </div>
        )}
      </div>
      <div className="UserCard">
        <Link to={`/profile/${name}`} className="card-body">
          {name}
        </Link>
      </div>
    </div>
  );
};

export default OtherUsers;
