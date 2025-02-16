import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAN_UP,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthencticated: null,
  loading: true,
  user: null,
  error: null,
  errorMsg: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthencticated: true,
        loading: false,
        user: payload,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, ...payload, isAuthencticated: true, loading: false };

    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthencticated: false,
        loading: false,
        error: payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        token: null,
        isAuthencticated: false,
        loading: false,
        errorMsg: payload,
      };

    case CLEAN_UP:
      return { ...state, error: null, errorMsg: null };
    case AUTH_ERROR:

    case LOGOUT:
      localStorage.removeItem("token");

      return {
        ...state,
        token: null,
        isAuthencticated: false,
        loading: false,
      };

    default:
      return { ...state };
  }
}
