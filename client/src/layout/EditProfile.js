import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./EditProfile.css";
import { connect } from "react-redux";
import axios from "axios";
import { getCurrentProfile } from "../actions/profile";
import Spinner from "../Spinner/Spinner";

function EditProfile({ profile, getCurrentProfile }) {
  const [form, setForm] = useState({
    nick: "",
    bio: "",
    website: "",
    gender: "",
  });

  useEffect(() => {
    getCurrentProfile();
    if (profile) {
      setForm({
        nick: profile.profile.nick,
        bio: profile.profile.bio,
        website: profile.profile.website,
        gender: profile.profile.gender,
      });
    }
  }, [getCurrentProfile]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ nick, bio, website, gender });
    await axios.post(
      "https://social-pics.herokuapp.com/api/profile/makeProfile",
      body,
      config
    );
  };

  const { nick, bio, website, gender } = form;
  return (
    <div>
      <Navbar />
      {profile ? (
        <div className="setting">
          <div style={{ flexBasis: "30%", borderRight: "1px solid #e8e8e8" }}>
            <div style={{ padding: "1em" }}>Edit Profile</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexBasis: "70%",
            }}
          >
            <div className="setting1">
              <div>name</div>
              <input
                onChange={(e) => onChange(e)}
                defaultValue={profile.profile.name}
                disabled
              ></input>
            </div>
            {profile.profile.nick ? (
              <div className="setting1">
                <div>nick name</div>
                <input
                  onChange={(e) => onChange(e)}
                  name="nick"
                  defaultValue={profile.profile.nick}
                  value={nick}
                  type="text"
                ></input>
              </div>
            ) : (
              <div className="setting1">
                <div>nick name</div>
                <input
                  onChange={(e) => onChange(e)}
                  name="nick"
                  value={nick}
                  type="text"
                ></input>
              </div>
            )}
            {profile.profile.bio ? (
              <div className="setting1">
                <div>bio</div>
                <input
                  onChange={(e) => onChange(e)}
                  name="bio"
                  value={bio}
                  defaultValue={profile.profile.bio}
                  type="text"
                ></input>
              </div>
            ) : (
              <div className="setting1">
                <div>bio</div>
                <input
                  onChange={(e) => onChange(e)}
                  name="bio"
                  value={bio}
                  type="text"
                ></input>
              </div>
            )}
            {profile.profile.website ? (
              <div className="setting1">
                <div>website</div>
                <input
                  onChange={(e) => onChange(e)}
                  name="website"
                  value={website}
                  defaultValue={profile.profile.website}
                  type="text"
                ></input>
              </div>
            ) : (
              <div className="setting1">
                <div>website</div>
                <input
                  onChange={(e) => onChange(e)}
                  name="website"
                  value={website}
                  type="text"
                ></input>
              </div>
            )}
            {profile.profile.gender ? (
              <div className="setting1">
                <div>Gender</div>
                <input
                  onChange={(e) => onChange(e)}
                  name="gender"
                  value={gender}
                  defaultValue={profile.profile.gender}
                  type="text"
                ></input>
              </div>
            ) : (
              <div className="setting1">
                <div>Gender</div>
                <input
                  onChange={(e) => onChange(e)}
                  name="gender"
                  value={gender}
                  type="text"
                ></input>
              </div>
            )}

            <div className="setting1">
              <div></div>
              <div
                style={{
                  backgroundColor: "lightblue",
                  padding: "0.5em",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={(e) => onSubmit(e)}
              >
                Submit
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    profile: state.profile.profile,
  };
};

export default connect(mapStateToProps, { getCurrentProfile })(EditProfile);
