import { GET_POSTS, UPDATE_LIKES } from "../actions/types";

const initialState = {
  posts: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return { ...state, posts: payload };

      break;

    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? { ...post, likes: payload.likes, like: payload.like }
            : post
        ),
      };

    default:
      return { ...state };
      break;
  }
}
