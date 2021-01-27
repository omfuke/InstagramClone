import React, { useState } from "react";
import "./upload.css";

const Upload = ({ closeEvent }) => {
  const [file, setFile] = useState(null);

  const onChangeHandler = (e) => {
    const file = e.target.files[0];
  };

  return (
    <div className="upload">
      <div className="upload-data">
        <label htmlFor="files" className="btn">
          Upload
        </label>
        <input
          onChange={(e) => onChangeHandler(e)}
          id="files"
          type="file"
          style={{ visibility: "hidden" }}
        />
        <div className="btn1" onClick={() => closeEvent()}>
          cancel
        </div>
      </div>
    </div>
  );
};

export default Upload;
