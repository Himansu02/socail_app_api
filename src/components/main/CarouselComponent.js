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
  pel,
  deleteHandler
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState([...images]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentImages([...images]);
  }, [images]);

  const handleDelete = () => {
    deleteHandler(currentIndex)
    setCurrentIndex((prev)=>prev%(currentImages.length-1))
  };

  const goToPrevSlide = () => {
    console.log("prev")
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + currentImages.length) % currentImages.length
    );
  };

  const goToNextSlide = () => {
    console.log("next")
    setCurrentIndex((prevIndex) => (prevIndex + 1) % currentImages.length);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div>
      <div className={styles.carousel}>
        {del || pel && (
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
                src={pel?URL.createObjectURL(image):image}
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
    </div>
  );
};

export default CarouselComponent;
