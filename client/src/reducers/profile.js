import {
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
  GET_OTHER_PROFILE,
  FOLLOW_PROFILE,
} from "../actions/types";

const initialState = {
  profile: null,

  profiles: [],
  loading: true,
  otherProfile: null,
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
      };

    case FOLLOW_PROFILE:
      return {
        ...state,
        profile: payload,
      };

    case GET_OTHER_PROFILE:
      return { ...state, otherProfile: payload };

    case PROFILE_ERROR:
      return { ...state, errors: payload, loading: true };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,

        loading: false,
      };

    default:
      return state;
  }
}
