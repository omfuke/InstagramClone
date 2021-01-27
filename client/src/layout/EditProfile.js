import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createProfile, getCurrentProfile } from "../actions/profile";

const EditProfile = ({
  createProfile,
  history,
  profile: { profile, loading },
}) => {
  const [formData, setFormData] = useState({ name: "", bio: "" });

  const { name, bio } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      name: profile.name,
      bio: profile.bio,
    });
  }, [loading, profile.name, profile.bio]);

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          className="input"
          type="text"
          name="name"
          value={name}
          placeholder="name"
          onChange={(e) => onChange(e)}
        ></input>
        <input
          className="input"
          type="text"
          name="bio"
          value={bio}
          placeholder="bio"
          onChange={(e) => onChange(e)}
        ></input>

        <button type="submit" className="Button">
          Update
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { profile: state.profile };
};

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
