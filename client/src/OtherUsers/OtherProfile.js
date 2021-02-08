import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getOtherProfile,
  followProfile,
  getCurrentProfile,
  unfollowProfile,
} from "../actions/profile";

const OtherProfile = ({
  match,
  profile,
  getOtherProfile,
  followProfile,
  getCurrentProfile,
  unfollowProfile,
  user,
}) => {
  console.log(profile.profile);

  useEffect(() => {
    getCurrentProfile();
    getOtherProfile(match.params.name);
  }, [getOtherProfile, match.params.name, getCurrentProfile]);

  return (
    <div>
      <h3>{match.params.name}</h3>

      {profile.otherProfile && profile.userFF ? (
        <div>
          <p>{profile.otherProfile.bio}</p>
          <p>followers: {profile.otherProfile.followers.length}</p>
          <p>following: {profile.otherProfile.following.length}</p>

          {profile.otherProfile.followers &&
          profile.otherProfile.followers.filter((p) => p.user === user._id)
            .length > 0 ? (
            <button
              className="btn btn-primary"
              onClick={() => unfollowProfile(profile.otherProfile.user)}
            >
              Unfollow
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => followProfile(profile.otherProfile.user)}
            >
              Follow
            </button>
          )}

          {/* {profile.otherProfile.followers.filter((p) => p.user === user._id)
            .length > 0 ? (
            <button
              className="btn btn-primary"
              onClick={() => unfollowProfile(profile.otherProfile.user)}
            >
              Unfollow
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => followProfile(profile.otherProfile.user)}
            >
              Follow
            </button>
          )} */}
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
  return { profile: state.profile, user: state.auth.user };
};

export default connect(mapStateToProps, {
  getOtherProfile,
  followProfile,
  getCurrentProfile,
  unfollowProfile,
})(OtherProfile);
