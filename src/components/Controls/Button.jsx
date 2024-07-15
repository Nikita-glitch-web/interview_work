/* eslint-disable no-unused-vars */
import React from "react";
import style from "./Button.module.css";
import PropTypes from "prop-types";

export const Button = ({text, onClick}) => {
    Button.propTypes = {
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    };

    Button.defaultProps = {
      onClick: () => {},
    };
  return  (
  <button className={style.header_btn}>{text}</button>
  )

};
