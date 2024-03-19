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

  const [cropBoxColor, setCropBoxColor] = useState("rgba(255,255,255,0.5)");

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

    if (selectedId) {
      trRef.current.nodes([rectRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [cropBoxWidth, cropBoxHeight, selectedId]); // Depend on cropBoxWidth and cropBoxHeight to trigger updates

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
    const scaleX = (image.width / image.naturalWidth) * imageScale;
    const scaleY = (image.height / image.naturalHeight) * imageScale;
    const canvas = document.createElement("canvas");
    canvas.width = cropConfig.width * scaleX;
    canvas.height = cropConfig.height * scaleY;
    const context = canvas.getContext("2d");
    context.drawImage(
      image,
      cropConfig.x, //the x-coordinate where to start clipping the original image
      cropConfig.y, //the y-coordinate where to start clipping the original image
      cropConfig.width, //the width of the clipped image
      cropConfig.height, //the height of the clipped image
      0,
      0,
      cropConfig.width * scaleX, // the width of the image to use in the destination canvas
      cropConfig.height * scaleY // the height of the image to use in the destination canvas
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
            fill={cropBoxColor}
            draggable
            onClick={() => selectShape("box")}
            onTransformEnd={() => {
              // Update the width and height when the transformation ends
              const node = rectRef.current;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();

              const newX = node.x();
              const newY = node.y();

              // Set the scale back to 1
              node.scaleX(1);
              node.scaleY(1);

              const newWidth = node.width() * scaleX;
              const newHeight = node.height() * scaleY;

              setCropBoxWidth(newWidth);
              setCropBoxHeight(newHeight);

              // Calculate the scaled dimensions of the image
              const scaledImageWidth = image.naturalWidth * imageScale;
              const scaledImageHeight = image.naturalHeight * imageScale;

              // Check if the crop box's boundaries exceed the image's boundaries
              if (
                node.x() < 0 ||
                node.y() < 0 ||
                node.x() + newWidth > scaledImageWidth ||
                node.y() + newHeight > scaledImageHeight ||
                newX + newWidth < 0 ||
                newY + newHeight < 0 ||
                newX > scaledImageWidth ||
                newY > scaledImageHeight
              ) {
                setCropBoxColor("rgba(255,0,0,0.5)"); // Red color
              } else {
                setCropBoxColor("rgba(255,255,255,0.5)"); // White color
              }
            }}
            onDragEnd={() => {
              const node = rectRef.current;
              const newX = node.x();
              const newY = node.y();

              // Calculate the new width and height of the crop box
              const newWidth = node.width() * node.scaleX();
              const newHeight = node.height() * node.scaleY();

              // Calculate the scaled dimensions of the image
              const scaledImageWidth = image.naturalWidth * imageScale;
              const scaledImageHeight = image.naturalHeight * imageScale;

              // Check if the crop box's boundaries exceed the image's boundaries
              if (
                node.x() < 0 ||
                node.y() < 0 ||
                node.x() + newWidth > scaledImageWidth ||
                node.y() + newHeight > scaledImageHeight ||
                newX + newWidth < 0 ||
                newY + newHeight < 0 ||
                newX > scaledImageWidth ||
                newY > scaledImageHeight
              ) {
                setCropBoxColor("rgba(255,0,0,0.5)"); // Red color
              } else {
                setCropBoxColor("rgba(255,255,255,0.5)"); // White color
              }
            }}
          />
          {selectedId && <Transformer ref={trRef} />}
        </Layer>
      </Stage>
    </div>
  );
};

export default ImageUploadWithMask;
