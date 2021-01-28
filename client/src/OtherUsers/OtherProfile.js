import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getOtherProfile } from "../actions/profile";

const OtherProfile = ({ match, profile, getOtherProfile }) => {
  useEffect(() => {
    getOtherProfile(match.params.name);
  }, [getOtherProfile]);

  return (
    <div>
      <h3>{match.params.name}</h3>
      {profile.otherProfile ? (
        <div>
          <p>{profile.otherProfile.bio}</p>
          <p>followers: {profile.otherProfile.followers.length}</p>
          <p>following: {profile.otherProfile.following.length}</p>
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
  return { profile: state.profile };
};

export default connect(mapStateToProps, { getOtherProfile })(OtherProfile);
