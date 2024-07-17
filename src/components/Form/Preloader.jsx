// src/components/Preloader/Preloader.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
import styles from "./Form.module.css";
import img from "./Preloader.png";

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <img className={styles.loader} src={img} alt=""/>
    </div>
  );
};

export default Preloader;
