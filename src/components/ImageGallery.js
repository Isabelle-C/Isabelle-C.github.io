import React, { useEffect, useState } from "react";

function ImageGallery() {
  // State to keep track of the index of the currently displayed image
  const [currentImage, setCurrentImage] = useState(0);

  // Select all image elements within the "image-stack" container
  const images = document.querySelectorAll(".image-stack img");

  useEffect(() => {
    // Function to update the currently displayed image
    const updateImage = () => {
      images.forEach((img, index) => {
        if (index === currentImage) {
          img.classList.add("active");
        } else {
          img.classList.remove("active");
        }
      });
    };

    // Initial update of the displayed image
    updateImage();
  }, [currentImage]);

  // Function to handle next button click
  const handleNextClick = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  // Function to handle previous button click
  const handlePrevClick = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  return (
    <div className="image-gallery">
      <div className="image-stack">
        <img src="logo192.png" alt="Image 1" className="active" />
        <img src="Screenshot 2023-12-11 at 12.22.16 AM.png" alt="Image 2" />
      </div>
      <div className="controls">
        <button id="nextButton" onClick={handleNextClick}>
          Next
        </button>
        <button id="prevButton" onClick={handlePrevClick}>
          Previous
        </button>
      </div>
    </div>
  );
}

export default ImageGallery;
