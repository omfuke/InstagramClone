import axios from "axios";
import { GET_POSTS } from "./types";

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
