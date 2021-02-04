import {
  GET_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
  GET_OTHER_PROFILE,
  FOLLOW_PROFILE,
} from "./types";
import axios from "axios";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const profile = await axios.get("/api/profile/me");
    const post = await axios.get("/api/post");

    dispatch({
      type: GET_PROFILE,
      payload: { profile: profile.data, post: post.data },
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: "server error",
      },
    });
  }
};

export const getAllProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile");

    dispatch({ type: GET_PROFILES, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: "server error",
      },
    });
  }
};

export const followProfile = (user) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ user });
  try {
    const res = await axios.post("/api/profile/followProfile", body, config);

    dispatch({ type: FOLLOW_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: "server error",
      },
    });
  }
};

export const getOtherProfile = (name) => async (dispatch) => {
  try {
    const res = await axios(`/api/profile/${name}`);
    dispatch({ type: GET_OTHER_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: "server error",
      },
    });
  }
};

export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  const config = {
    headers: {
      Content_Type: "application/json",
    },
  };

  try {
    const res = await axios.post("/api/profile", formData, config);
    dispatch({ type: GET_PROFILE, payload: res });
    history.push("/dashboard");
  } catch (err) {
    console.log(err);
  }
};
