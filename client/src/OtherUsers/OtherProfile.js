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
import PersonImg from "./l60Hf.png";
import { Link } from "react-router-dom";

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
                <div>
                  {profile.otherProfile.profileImage ? (
                    <img
                      src={profile.otherProfile.profileImage}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <img
                      src={PersonImg}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </div>
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
                  {/* posts 0 followers: {profile.otherProfile.followers.length}{" "}
                  following: {profile.otherProfile.following.length} */}

                  <span style={{ marginLeft: "1em" }}>
                    {profile.otherProfilePosts.length} : posts
                  </span>
                  <span style={{ marginLeft: "1em" }}>
                    {profile.otherProfile.followers.length} : followers
                  </span>
                  <span style={{ marginLeft: "1em" }}>
                    {profile.otherProfile.following.length} : following
                  </span>
                </div>
              </div>
            </div>
            {profile.otherProfilePosts && (
              <div className="header2">
                {profile.otherProfilePosts.map((p) => (
                  <Link
                    to={`/post/${p._id}`}
                    className="OProfileImg1"
                    style={{
                      background: `url(${p.image}) no-repeat center/cover`,
                    }}
                  >
                    {/* <img
                      className="OProfileImg"
                      src={`/${p.image.split("\\")[1]}`}
                    /> */}
                    <div className="OProfileImg2">
                      <i
                        style={{ color: "white", marginRight: "0.5em" }}
                        class="fas fa-heart"
                      ></i>
                      {p.likes.length}
                    </div>
                  </Link>
                ))}
              </div>
            )}
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
