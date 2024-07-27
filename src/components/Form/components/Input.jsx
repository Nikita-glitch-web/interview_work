// eslint-disable-next-line no-unused-vars
import React from "react";
import classNames from "classnames";
import styles from "./Input.module.css";
import PropTypes from "prop-types";

export const Input = ({
  errorMessage,
  value,
  type,
  placeholder,
  onFocus,
  onBlur,
  onChange,
  name,
  tooltip,
}) => {
  const id = `${name + Date.now()}`;

  return (
    <div className={styles.input_wrapper}>
      <div className={styles.form_group}>
        <input
          type={type}
          id={id}
          className={classNames(styles.form_field, {
            [styles.notValid]: errorMessage,
          })}
          placeholder={placeholder}
          onFocus={onFocus}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
        />
        <label htmlFor={id} className={styles.form_label}>
          {placeholder}
        </label>
      </div>
      {errorMessage && (
        <span className={styles.error_message}>{errorMessage}</span>
      )}
      {tooltip && <span className={styles.tooltip}>{tooltip}</span>}
    </div>
  );
};

Input.propTypes = {
  errorMessage: PropTypes.string,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onFocus: PropTypes.func,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  tooltip: PropTypes.string,
};
