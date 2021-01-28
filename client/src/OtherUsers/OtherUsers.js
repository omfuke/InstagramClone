import React from "react";
import { Link } from "react-router-dom";

const OtherUsers = ({ name }) => {
  return (
    <div className="container-sm">
      <div className="card">
        <Link to={`/profile/${name}`} className="card-body">
          {name}
        </Link>
      </div>
    </div>
  );
};

export default OtherUsers;
