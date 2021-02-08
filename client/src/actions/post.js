import axios from "axios";
import { GET_POSTS, UPDATE_LIKES } from "./types";

export const getPosts = () => async (dispatch) => {
  try {
    const posts = await axios.get("api/post/posts");

    dispatch({
      type: GET_POSTS,
      payload: posts.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateLikes = (postId, userId) => async (dispatch) => {
  try {
    const res = await axios.get(`api/post/like/${postId}`);

    const like = res.data.filter((like) => like.user === userId).length > 0;

    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data, like: like },
    });
  } catch (error) {
    console.error(error);
  }
};
