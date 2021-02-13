import React, { useState } from "react";
import "./upload.css";

const Upload = ({ setPost, onChangeHandler, postHandler }) => {
  return (
    <div className="postModal">
      <div className="postModal1">
        <p>Create Post</p>
        <i
          className="fas fa-times-circle fa-2x"
          onClick={() => setPost(false)}
        ></i>
      </div>
      <div className="postModal2">
        <label htmlFor="files" className="btn btn-primary">
          Upload
        </label>
        <input
          onChange={(e) => onChangeHandler(e)}
          id="files"
          type="file"
          style={{ display: "none" }}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => postHandler()}
      >
        post
      </button>
    </div>
  );
};

export default Upload;
