import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR } from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false };

    case PROFILE_ERROR:
      return { ...state, errors: payload, loading: true };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        profiles: [],
        loading: false,
      };

    default:
      return state;
  }
}
