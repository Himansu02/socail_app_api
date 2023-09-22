import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import styles from "./PostImage.module.css";
import { Link } from "react-router-dom";

const PostImage = ({ images }) => {
  console.log(images);
  const [slideIndex, setSlideIndex] = useState(0);

  const totalImages = 2;

  const slideClickHandler = (direction) => {
    if (direction === "left") {
      setSlideIndex((slideIndex - 1 + totalImages) % totalImages);
    } else {
      setSlideIndex((slideIndex + 1) % totalImages);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.arrow}
        style={{ left: "10px" }}
        onClick={() => slideClickHandler("left")}
      >
        <ArrowLeftOutlined></ArrowLeftOutlined>
      </div>
      <div
        className={styles.wrapper}
        style={{
          transform: `translateX(-${slideIndex * 100}%)`,
          transition: "transform 1.5s ease",
        }}
      >
        <div className={styles.imageContainer}>
          <img
            src="https://i.pinimg.com/originals/48/50/27/485027653f9a0d9de7f0040654f21339.jpg"
            className={styles.image}
          ></img>
        </div>

        <div className={styles.imageContainer}>
          <img
            src="https://th.bing.com/th/id/R.05c080faf84d6ef254191df22f4a7ac7?rik=WYtQ1QQhpEH95w&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fCpRGNUC.jpg&ehk=mgNLokPW%2bv%2b4VNR6nAoUUHBNEh91Rdtum%2bzTxuTe19s%3d&risl=&pid=ImgRaw&r=0"
            className={styles.image}
          ></img>
        </div>
      </div>

      <div
        className={styles.arrow}
        style={{ right: "10px" }}
        onClick={() => slideClickHandler("right")}
      >
        <ArrowRightOutlined></ArrowRightOutlined>
      </div>
    </div>
  );
};

export default PostImage;
