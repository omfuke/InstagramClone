import React, { useEffect } from "react";
import NavBar from "./Navbar";
import { connect } from "react-redux";
import { getAllProfiles } from "../actions/profile";
import { getCurrentProfile } from "../actions/profile";

const AllProfiles = ({ profile, getCurrentProfile, getAllProfiles }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  return (
    <div>
      <NavBar />
      {profile.profiles.map((p) => (
        <div className="card">
          <div className="card-body">{p.name}</div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { profile: state.profile };
};

export default connect(mapStateToProps, { getCurrentProfile, getAllProfiles })(
  AllProfiles
);
