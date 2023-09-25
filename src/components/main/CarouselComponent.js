// Carousel.js
import React, { useEffect, useState } from "react";
import styles from "./CarouselComponent.module.css";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  Delete,
} from "@mui/icons-material";
import Spinner from "../UI/Spinner";

const CarouselComponent = ({
  size,
  images,
  del,
  height,
  updatePostData,
  closeModal,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([...images]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentImages([...images]);
  }, [images]);

  const handleDelete = () => {
    setCurrentImages((prev) => {
      return prev.filter((image, idx) => {
        return idx !== currentIndex;
      });
    });
  };

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + currentImages.length) % currentImages.length
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % currentImages.length);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div>
      <div className={styles.carousel}>
        {del && (
          <button className={styles.deleteButton} onClick={handleDelete}>
            <Delete fontSize="large" />
          </button>
        )}
        {currentImages.length > 1 && (
          <div
            className={styles.arrow}
            style={{ left: "14px" }}
            onClick={goToPrevSlide}
          >
            <ArrowLeftOutlined fontSize="large"></ArrowLeftOutlined>
          </div>
        )}
        <div
          className={styles.test}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`, // Adjusted for 748px width
            transition: "transform 1.5s ease",
          }}
        >
          {currentImages.map((image, index) => (
            <div
              key={index}
              className={`${styles.slide} ${
                index === currentIndex ? styles.active : ""
              }`}
              style={{
                flex: `0 0 ${size + "px"}`,
                height: height ? height : "752px",
              }}
            >
              {isLoading && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Spinner />
                </div>
              )}
              <img
                src={image}
                alt={`Image ${index + 1}`}
                onLoad={handleImageLoad}
                style={{ display: isLoading ? "none" : "block" }}
              />
            </div>
          ))}
        </div>
        {currentImages.length > 1 && (
          <div
            className={styles.arrow}
            style={{ right: "14px" }}
            onClick={goToNextSlide}
          >
            <ArrowRightOutlined fontSize="large"></ArrowRightOutlined>
          </div>
        )}
      </div>
      {del && (
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={() => {
              closeModal();
            }}
          >
            Cancel
          </button>
          <button
            className={styles.button}
            onClick={() => {
              updatePostData(currentImages);
            }}
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default CarouselComponent;
