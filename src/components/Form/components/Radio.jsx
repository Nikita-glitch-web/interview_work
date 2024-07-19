// src/components/Form/components/RadioButton.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import styles from "./RadioButton.module.css";

export const RadioButton = ({ position, selectedPosition, onChange }) => {
  return (
    <label key={position.id} className={styles.pure_material_radio}>
      <input
        type="radio"
        value={position.name}
        name="group"
        checked={selectedPosition === position.name}
        onChange={(e) => onChange(e.target.value)}
        className={styles.radio_buttons__input}
      />
      <span className={styles.radio_buttons__span}>{position.name}</span>
    </label>
  );
};

RadioButton.propTypes = {
  position: PropTypes.object.isRequired,
  selectedPosition: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
