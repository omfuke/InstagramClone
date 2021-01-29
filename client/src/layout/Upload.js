import React, { useState } from "react";
import "./upload.css";

const Upload = ({ closeEvent }) => {
  const [file, setFile] = useState(null);

  const onChangeHandler = (e) => {
    const selected = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(selected);
  };

  return (
    <div className="upload">
      <div
        className={!file ? "upload-data" : "imagePreview"}
        style={{
          background: file ? `url("${file}") no-repeat center/cover` : "white",
        }}
      >
        {!file && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Upload;
