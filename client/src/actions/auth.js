import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  CLEAN_UP,
} from "../actions/types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("https://social-pics.herokuapp.com/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post(
      "https://social-pics.herokuapp.com/api/users",
      body,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    console.log(err.response.data);
    const error = {};
    error.email = err.response.data.errors.filter(
      (e) => e.param === "email"
    )[0];
    error.password = err.response.data.errors.filter(
      (e) => e.param === "password"
    )[0];
    error.name = err.response.data.errors.filter((e) => e.param === "name")[0];
    console.log(error);
    dispatch({
      type: REGISTER_FAIL,
      payload: error,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      "https://social-pics.herokuapp.com/api/auth",
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err);
    dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

export const clearProfile = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
};

export const clean = () => (dispatch) => {
  dispatch({ type: CLEAN_UP });
};
