import React, { useState, useCallback, useRef, useEffect } from "react";
import "./upload.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const Upload = ({ setPost }) => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState(null);
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%", width: 100, height: 100 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onChangeHandler = async (e) => {
    setFiles(true);
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      console.log(file);
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    console.log(imgRef.current);
  }, [completedCrop]);

  const postHandler = async (canvas, crop) => {
    if (!crop || !canvas) {
      return;
    }

    // const blob = await new Promise(resolve=>canvas.toBlob(res))
    canvas.toBlob(
      async (blob) => {
        let files = new File([blob], "fileName.jpg", { type: "image/jpeg" });

        console.log(files);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        console.log(files);
        const formData = new FormData();
        formData.append("file", files);

        await axios.post(
          "https://social-pics.herokuapp.com/api/post",
          formData,
          config
        );
        setPost(false);
      },
      "image/jpeg",
      1
    );

    return <Redirect to="/profile" />;
  };
  return (
    <>
      <div className="postModal">
        {files && (
          <ReactCrop
            style={{
              width: "50vw",
              height: "50vh",
              overflow: "auto",
              overflowX: "hidden",
              marginBottom: "1em",
            }}
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          />
        )}

        <div style={{ display: "none" }}>
          <canvas
            ref={previewCanvasRef}
            // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
            style={{
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0),
            }}
          />
        </div>

        <div className="postModal2">
          <label
            htmlFor="files"
            style={{
              padding: "0.5em",
              borderRadius: "2%",
              backgroundColor: "skyblue",
              color: "white",
              cursor: "pointer",
            }}
          >
            Upload
          </label>
          <input
            onChange={(e) => onChangeHandler(e)}
            id="files"
            type="file"
            style={{ display: "none" }}
          />
        </div>
        <div className="postModal3">
          {files ? (
            <div
              style={{
                backgroundColor: "lightgreen",
                padding: "0.5em",
                borderRadius: "2%",
                cursor: "pointer",
              }}
              onClick={() =>
                postHandler(previewCanvasRef.current, completedCrop)
              }
            >
              post
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "tomato",
                padding: "0.5em",
                borderRadius: "2%",
                cursor: "pointer",
              }}
              onClick={() => setPost(false)}
            >
              close
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Upload;
