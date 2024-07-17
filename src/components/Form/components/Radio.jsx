// src/components/Form/components/RadioButton.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import styles from "./RadioButton.module.css";

export const RadioButtons = ({ positions, selectedPosition, onChange }) => {
  return (
    <div className={styles.radio_buttons}>
      {positions.map((position) => (
        <label key={position} className={styles.pure_material_radio}>
          <input
            type="radio"
            value={position}
            name="group"
            checked={selectedPosition === position}
            onChange={(e) => onChange(e.target.value)}
            className={styles.radio_buttons__input}
          />
          <span className={styles.radio_buttons__span}>{position}</span>
        </label>
      ))}
    </div>
  );
};

RadioButtons.propTypes = {
  positions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedPosition: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
