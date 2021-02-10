import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getOtherProfile,
  followProfile,
  getCurrentProfile,
  unfollowProfile,
} from "../actions/profile";
import NavBar from "../layout/Navbar";
import Spinner from "../Spinner/Spinner";
import "./OtherProfile.css";

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
      <NavBar />

      {profile.otherProfile && profile.userFF ? (
        <div>
          <div className="OtherProfile">
            <div className="header1">
              <div className="oProfile1">
                <div></div>
              </div>
              <div className="oProfile2">
                <div className="oProfile2D">
                  <span>{match.params.name}</span>
                  {profile.otherProfile.followers &&
                  profile.otherProfile.followers.filter(
                    (p) => p.user === user._id
                  ).length > 0 ? (
                    <div
                      className="follow"
                      onClick={() => unfollowProfile(profile.otherProfile.user)}
                    >
                      Unfollow
                    </div>
                  ) : (
                    <div
                      type="button"
                      className="follow"
                      onClick={() => followProfile(profile.otherProfile.user)}
                    >
                      Follow
                    </div>
                  )}
                </div>
                <div>
                  posts 0 followers: {profile.otherProfile.followers.length}{" "}
                  following: {profile.otherProfile.following.length}
                </div>
              </div>
            </div>
            <div className="header2">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
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
