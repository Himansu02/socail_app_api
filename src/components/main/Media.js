import React, { useState } from "react";
import Masonry from "react-masonry-css";
import styles from "./Media.module.css";
import { Modal } from "@mui/material";

const Media = ({ images }) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const openModal = (image) => {
    setSelectedImageUrl(image);
  };

  const closeModal = () => {
    setSelectedImageUrl(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.coverContainer}>
        {images.map((image) => {
          return (
            <div className={styles.imageContainer}>
              <img
                className={styles.image}
                src={image}
                onClick={() => {
                  openModal(image);
                }}
              />
            </div>
          );
        })}
      </div>
      <Modal open={selectedImageUrl !== null} onClose={closeModal}>
        <div className={styles.modalContainer} onClick={closeModal}>
          <div className={styles.selectedImageContainer}>
            <img src={selectedImageUrl} alt="Selected" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Media;
