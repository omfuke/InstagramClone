import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { createProfile } from "../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({ name: "", bio: "" });

  const { name, bio } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { profile: state.profile.profile };
};

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
