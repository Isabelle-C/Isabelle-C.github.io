import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Rect, Transformer } from "react-konva";

const useImage = (url) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!url) return;
    setIsLoading(true);
    const img = new window.Image();
    img.crossOrigin = "Anonymous"; // Add this line if you're loading cross-origin images
    img.src = url;
    img.onload = () => {
      setImage(img);
      setIsLoading(false);
    };
  }, [url]);

  return [image, isLoading];
};

const ImageUploadWithMask = () => {
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
  const [image, isLoading] = useImage(uploadedImageSrc);
  const [selectedId, selectShape] = useState(null);
  const rectRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (selectedId) {
      trRef.current.nodes([rectRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedId]);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setUploadedImageSrc(fileReader.result);
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  const [cropBoxWidth, setCropBoxWidth] = useState(100);
  const [cropBoxHeight, setCropBoxHeight] = useState(100);

  const handleCrop = () => {
    if (!image) return; // Make sure the image is loaded

    const scaleX = image.width / image.naturalWidth;
    const scaleY = image.height / image.naturalHeight;

    const cropConfig = {
      x: rectRef.current.x() / scaleX,
      y: rectRef.current.y() / scaleY,
      width: (rectRef.current.width() * rectRef.current.scaleX()) / scaleX,
      height: (rectRef.current.height() * rectRef.current.scaleY()) / scaleY,
    };

    const canvas = document.createElement("canvas");
    // Assuming cropConfig is defined and contains the crop dimensions...
    canvas.width = cropConfig.width;
    canvas.height = cropConfig.height;
    const context = canvas.getContext("2d");

    context.drawImage(
      image,
      cropConfig.x,
      cropConfig.y,
      cropConfig.width,
      cropConfig.height, // Source dimensions
      0,
      0,
      cropConfig.width,
      cropConfig.height, // Destination dimensions
    );

    const croppedImageDataURL = canvas.toDataURL("image/png");
    downloadImage(croppedImageDataURL, "cropped-image.png");
  };

  const downloadImage = (dataUrl, fileName) => {
    const link = document.createElement("a");
    link.download = fileName;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} accept="image/*" />
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {image && !isLoading && <Image image={image} />}
          <Rect
            ref={rectRef}
            x={20}
            y={20}
            width={cropBoxWidth}
            height={cropBoxHeight}
            fill="rgba(255,255,255,0.5)"
            draggable
            onClick={() => selectShape("box")}
            onTransformEnd={() => {
              // Updates for crop dimensions after transformations if needed
            }}
          />
          {selectedId && <Transformer ref={trRef} />}
        </Layer>
      </Stage>
      <button onClick={handleCrop}>Crop and Save</button>
    </div>
  );
};

export default ImageUploadWithMask;
