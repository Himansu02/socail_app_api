import React, { useState } from 'react';
import styles from './Loader.module.css'; // Import the CSS module

function Loader({progress}) {

  return (
      <div className={styles['upload-progress']}>
        <div className={styles.message}>
            <h1>Your Post is Getting Ready</h1>
        </div>
        <div className={styles.loader}>
          <svg className={styles.circular} viewBox="25 25 50 50">
            <circle
              className={styles.path}
              cx="50"
              cy="50"
              r="20"
              fill="none"
              strokeWidth="4"
              strokeMiterlimit="10"
            />
          </svg>
          <span className={styles.percentage}>{Math.round(progress)}%</span>
        </div>
      </div>
  );
}

export default Loader;