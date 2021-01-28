import { GET_PROFILE, PROFILE_ERROR } from "./types";
import axios from "axios";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const profile = await axios.get("/api/profile/me");
    const post = await axios.get("/api/post");

    dispatch({ type: GET_PROFILE, payload: profile.data, data: post.data });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
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
