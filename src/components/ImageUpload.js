// Import necessary hooks and components from React and react-konva
import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Rect, Transformer } from "react-konva";

/**
 * Custom hook to load an image by URL.
 * @param {string} url The URL of the image to load.
 * @returns {[any, boolean]} An array containing the loaded image and a loading state.
 */
const useImage = (url) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!url) return;
    setIsLoading(true);
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    img.onload = () => {
      setImage(img);
      setIsLoading(false);
    };
  }, [url]);

  return [image, isLoading];
};

/**
 * Main component for image upload and manipulation.
 */
const ImageUploadWithMask = () => {
  const [uploadedImageSrc, setUploadedImageSrc] = useState(null);
  const [image, isLoading] = useImage(uploadedImageSrc);
  const [selectedId, selectShape] = useState(null);
  const rectRef = useRef();
  const trRef = useRef();
  const [cropBoxWidth, setCropBoxWidth] = useState(200);
  const [cropBoxHeight, setCropBoxHeight] = useState(200);
  const [fileName, setFileName] = useState("");
  const [imageScale, setImageScale] = useState(1);

  useEffect(() => {
    // Check if the rectRef is available to update
    if (rectRef.current) {
      // Update Konva Rect dimensions
      rectRef.current.width(cropBoxWidth);
      rectRef.current.height(cropBoxHeight);
      rectRef.current.getLayer().batchDraw(); // Redraw layer to apply changes
    }

    // If the Transformer is targeting the updated rectangle, force it to update
    if (trRef.current) {
      trRef.current.nodes([rectRef.current]); // Attach Transformer to the rectangle
      trRef.current.getLayer().batchDraw(); // Redraw layer to apply changes
    }
  }, [cropBoxWidth, cropBoxHeight]); // Depend on cropBoxWidth and cropBoxHeight to trigger updates

  // Updates the uploaded image source upon file selection
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => setUploadedImageSrc(fileReader.result);
      fileReader.readAsDataURL(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  // Handlers for crop box dimension changes
  const handleWidthChange = (e) => {
    const newWidth = parseFloat(e.target.value);
    if (!isNaN(newWidth) && newWidth > 0) {
      // Validate newWidth is a number and greater than 0
      setCropBoxWidth(newWidth);
    }
  };

  const handleHeightChange = (e) => {
    const newHeight = parseFloat(e.target.value);
    if (!isNaN(newHeight) && newHeight > 0) {
      // Validate newHeight is a number and greater than 0
      setCropBoxHeight(newHeight);
    }
  };

  const handleScaleChange = (e) => setImageScale(e.target.value);

  // Executes the crop operation
  const handleCrop = () => {
    if (!image) return;
    // Calculate crop dimensions based on image and box scales
    const cropConfig = calculateCropConfig();
    const croppedImageDataURL = cropImage(image, cropConfig);
    downloadImage(croppedImageDataURL, fileName);
  };

  // Calculates the crop configuration
  const calculateCropConfig = () => {
    const scaleX = (image.width / image.naturalWidth) * imageScale;
    const scaleY = (image.height / image.naturalHeight) * imageScale;
    return {
      x: rectRef.current.x() / scaleX,
      y: rectRef.current.y() / scaleY,
      width: (rectRef.current.width() * rectRef.current.scaleX()) / scaleX,
      height: (rectRef.current.height() * rectRef.current.scaleY()) / scaleY,
    };
  };

  // Performs the actual cropping of the image
  const cropImage = (image, cropConfig) => {
    const canvas = document.createElement("canvas");
    canvas.width = cropConfig.width;
    canvas.height = cropConfig.height;
    const context = canvas.getContext("2d");
    context.drawImage(
      image,
      cropConfig.x,
      cropConfig.y,
      cropConfig.width,
      cropConfig.height,
      0,
      0,
      cropConfig.width,
      cropConfig.height,
    );
    return canvas.toDataURL("image/png");
  };

  // Downloads the cropped image
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
      {/* Input fields for width, height, and scale adjustments */}
      <label>
        Width:{" "}
        <input
          type="number"
          value={cropBoxWidth}
          onChange={handleWidthChange}
        />
      </label>
      <label>
        Height:{" "}
        <input
          type="number"
          value={cropBoxHeight}
          onChange={handleHeightChange}
        />
      </label>
      <label>
        Scale:{" "}
        <input
          type="range"
          min="0.1"
          max="2"
          step="0.1"
          value={imageScale}
          onChange={handleScaleChange}
        />
      </label>
      <button onClick={handleCrop}>Crop and Save</button>
      {/* Konva Stage for image and cropping rectangle */}
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
              // Updates crop box dimensions after transform
              const node = rectRef.current;
              setCropBoxWidth(node.width() * node.scaleX());
              setCropBoxHeight(node.height() * node.scaleY());
              node.scaleX(1);
              node.scaleY(1);
            }}
          />
          {selectedId && <Transformer ref={trRef} />}
        </Layer>
      </Stage>
    </div>
  );
};

export default ImageUploadWithMask;
