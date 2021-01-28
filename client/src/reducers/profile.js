import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR } from "../actions/types";

const initialState = {
  profile: null,
  posts: null,
  loading: true,
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload, data } = action;

  switch (type) {
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false, posts: data };

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
