import { GET_POSTS } from "../actions/types";

const initialState = {
  posts: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return { ...state, posts: payload };

      break;

    default:
      return { ...state };
      break;
  }
}
