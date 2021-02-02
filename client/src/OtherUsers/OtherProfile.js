import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getOtherProfile,
  followProfile,
  getCurrentProfile,
} from "../actions/profile";

const OtherProfile = ({
  match,
  profile,
  getOtherProfile,
  followProfile,
  getCurrentProfile,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getOtherProfile(match.params.name);
  }, [getOtherProfile, match.params.name, getCurrentProfile]);

  return (
    <div>
      <h3>{match.params.name}</h3>
      {profile.otherProfile ? (
        <div>
          <p>{profile.otherProfile.bio}</p>
          <p>followers: {profile.otherProfile.followers.length}</p>
          <p>following: {profile.otherProfile.following.length}</p>
          {profile.profile.following.filter(
            (p) => p.user === profile.otherProfile.user
          ).length > 0 ? (
            <button className="btn btn-primary">Following</button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => followProfile(profile.otherProfile.user)}
            >
              Follow
            </button>
          )}
        </div>
      ) : (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { profile: state.profile };
};

export default connect(mapStateToProps, {
  getOtherProfile,
  followProfile,
  getCurrentProfile,
})(OtherProfile);
