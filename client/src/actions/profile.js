import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR } from "./types";
import axios from "axios";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const profile = await axios.get("/api/profile/me");
    dispatch({ type: GET_PROFILE, payload: profile.data });
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
