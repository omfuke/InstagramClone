import {
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
} from "../actions/types";

const initialState = {
  profile: null,
  posts: null,
  profiles: [],
  loading: true,
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload.profile,
        loading: false,
        posts: payload.post,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
      };

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
