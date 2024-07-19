// src/components/Preloader/Preloader.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
import styles from "./Preloader.module.css";
import img from "./Preloader.png";

export const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <img className={styles.loader} src={img} alt="" />
    </div>
  );
};
