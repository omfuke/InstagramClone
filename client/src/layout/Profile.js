import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { getCurrentProfile } from "../actions/profile";

const Profile = ({ profile, getCurrentProfile }) => {
  //   useEffect(() => {
  //     getCurrentProfile();
  //   }, []);
  return (
    <div>
      <Navbar />
      <p>hello {profile.name}</p>
      <p>hello {profile.name}</p>
      <p>hello {profile.name}</p>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { profile: state.profile.profile };
};

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
