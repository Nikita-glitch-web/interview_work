// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import style from "./Button.module.css";

export const Button = ({ text, onClick, disabled, type="button"}) => {
  return (
    <button
      className={`${style.button} ${disabled ? style.disabled : ""}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
};