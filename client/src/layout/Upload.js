import React from "react";
import "./upload.css";

const Upload = ({ closeEvent }) => {
  return (
    <div className="upload">
      <div className="upload-data">
        <div className="btn">upload photo</div>
        <div className="btn1" onClick={() => closeEvent()}>
          cancel
        </div>
      </div>
    </div>
  );
};

export default Upload;
