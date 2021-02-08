import React, { useEffect } from "react";
import NavBar from "./Navbar";
import { connect } from "react-redux";
import { getAllProfiles, getCurrentProfile } from "../actions/profile";
import OtherUsers from "../OtherUsers/OtherUsers";

const AllProfiles = ({
  profile,
  isAuthencticated,
  getCurrentProfile,
  getAllProfiles,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getAllProfiles();
  }, [getAllProfiles, getCurrentProfile]);

  return (
    <div>
      {profile.profiles ? (
        <div>
          <NavBar />
          {profile.profiles.map((p) => (
            <OtherUsers key={p._id} name={p.name} />
          ))}
        </div>
      ) : (
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    isAuthencticated: state.auth.isAuthencticated,
  };
};

export default connect(mapStateToProps, { getAllProfiles, getCurrentProfile })(
  AllProfiles
);
