import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Rect, Transformer } from "react-konva";

const useImage = (url) => {
  // This function will return an array with two values
  // The first value is the image object, and the second is a boolean
  // that indicates whether the image is still loading

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
  // This component will allow the user to upload an image and then
  // draw a rectangle on top of it to define the crop area

  // The uploaded image source
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
  // The image object and loading state
  const [image, isLoading] = useImage(uploadedImageSrc);
  // The ID of the selected shape
  const [selectedId, selectShape] = useState(null);
  // The reference to the Rect and Transformer nodes
  const rectRef = useRef();
  // The reference to the Transformer node
  const trRef = useRef();

  // The width and height of the crop box
  const [cropBoxWidth, setCropBoxWidth] = useState(100);
  const [cropBoxHeight, setCropBoxHeight] = useState(100);

  useEffect(() => {
    // Force the Transformer to update when the Rect's size changes
    if (trRef.current) {
      trRef.current.forceUpdate();
      // This is a workaround to fix a bug in Konva where the Transformer
      // doesn't update the size of the bounding box when the target node
      // is updated.
      if (selectedId) {
        trRef.current.nodes([rectRef.current]);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [cropBoxWidth, cropBoxHeight, selectedId]);

  // Handle the case where the user uploads a new image
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setUploadedImageSrc(fileReader.result);
      };
      fileReader.readAsDataURL(event.target.files[0]);
    }
  };

  // Handle the case where the user changes the width or height of the crop box
  const handleWidthChange = (event) => {
    setCropBoxWidth(event.target.value);
  };

  const handleHeightChange = (event) => {
    setCropBoxHeight(event.target.value);
  };

  // The scale of the image
  const [imageScale, setImageScale] = useState(1);

  // Handle the case where the user changes the scale of the image
  const handleScaleChange = (event) => {
    setImageScale(event.target.value);
  };

 // Handle the case where the user clicks the "Crop and Save" button
const handleCrop = () => {
  if (!image) return; // Make sure the image is loaded

  const scaleX = (image.width / image.naturalWidth) * imageScale;
  const scaleY = (image.height / image.naturalHeight) * imageScale;

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
    cropConfig.height // Destination dimensions
  );

  const croppedImageDataURL = canvas.toDataURL("image/png");
  downloadImage(croppedImageDataURL, "cropped-image.png");
};

  // A function to download the cropped image
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
      <label>
        Width:
        <input
          type="number"
          value={cropBoxWidth}
          onChange={handleWidthChange}
        />
      </label>
      <label>
        Height:
        <input
          type="number"
          value={cropBoxHeight}
          onChange={handleHeightChange}
        />
      </label>
      <label>
        Scale:
        <input
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={imageScale}
          onChange={handleScaleChange}
        />
      </label>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {image && (
            <Image image={image} scaleX={imageScale} scaleY={imageScale} />
          )}
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
              // Update the width and height when the transformation ends
              const node = rectRef.current;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();

              // Set the scale back to 1
              node.scaleX(1);
              node.scaleY(1);

              setCropBoxWidth(node.width() * scaleX);
              setCropBoxHeight(node.height() * scaleY);
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
