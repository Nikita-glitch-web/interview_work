// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import style from "./Button.module.css";

export const Button = ({
  children,
  onClick,
  disabled,
  type = "button",
  className,
}) => {
  const classNames = [
    style.button,
    className,
    disabled ? style.disabled : "",
  ].join(" ");

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
};
