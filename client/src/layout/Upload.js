import React, { useState } from "react";
import "./upload.css";
import { useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";

const Upload = ({ closeEvent, dpHandler }) => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        file,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
      dpHandler(croppedImage);
      closeEvent();
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const onChangeHandler = (e) => {
    const selected = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      setFile(reader.result);
    };
    reader.readAsDataURL(selected);
  };

  if (file) {
    return (
      <div className="crop-container">
        <Cropper
          image={file}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        <div
          className="btn2"
          style={{ zIndex: "12" }}
          onClick={showCroppedImage}
        >
          Click
        </div>
      </div>
    );
  }

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
              style={{ display: "none" }}
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
