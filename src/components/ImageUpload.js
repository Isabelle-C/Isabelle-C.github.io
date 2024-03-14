import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Rect, Transformer } from "react-konva";

const useImage = (url) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!url) return;
    setIsLoading(true);
    const img = new window.Image();
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
  const [image] = useImage(uploadedImageSrc);
  const [selectedId, selectShape] = useState(null);
  const rectRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (selectedId) {
      // Update the transformer's nodes to the selected shape
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

    const handleWidthChange = (event) => {
      setCropBoxWidth(event.target.value);
    };

    const handleHeightChange = (event) => {
      setCropBoxHeight(event.target.value);
    };

const handleCrop = () => {
  // Assuming `image` is the loaded Image object from `useImage` hook
  const cropConfig = {
    x: rectRef.current.x(),
    y: rectRef.current.y(),
    width: rectRef.current.width() * rectRef.current.scaleX(),
    height: rectRef.current.height() * rectRef.current.scaleY(),
  };

  const canvas = document.createElement("canvas");
  // Assuming cropConfig is defined and contains the crop dimensions...
  canvas.width = cropConfig.width;
  canvas.height = cropConfig.height;
  const context = canvas.getContext("2d");

  if (image && image.complete) {
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

    // Convert the canvas to a Data URL
    const croppedImageDataURL = canvas.toDataURL("image/png");

    // Create a temporary link element
    const downloadLink = document.createElement("a");
    // Set the download attribute to the desired file name
    downloadLink.download = "cropped-image.png";
    // Set the href attribute to the Data URL
    downloadLink.href = croppedImageDataURL;
    // Append the link to the document body (required for Firefox)
    document.body.appendChild(downloadLink);
    // Programmatically click the link to trigger the download
    downloadLink.click();
    // Remove the link after triggering the download
    document.body.removeChild(downloadLink);
  } else {
    console.error("Image not loaded");
  }
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
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {image && <Image image={image} />}
          <Rect
            ref={rectRef}
            x={20}
            y={20}
            width={cropBoxWidth}
            height={cropBoxHeight}
            
            fill="rgba(255,255,255,0.5)"
            draggable
            onClick={() => selectShape("box")}
            onTransformEnd={(e) => {
              // transformer is changing scale of the node
              // and NOT its width or height
              // but in the store we have only width and height
              // to match the data better we will reset scale on transform end
              const node = rectRef.current;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();

              // we will reset it back
              node.scaleX(1);
              node.scaleY(1);
              node.width(Math.max(5, node.width() * scaleX));
              node.height(Math.max(node.height() * scaleY));
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
