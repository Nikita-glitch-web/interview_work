// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import style from './Button.module.css';

export const Link = ({ children, className, href }) => {
  const classNames = [style.button, className].join(' ');
  return <a {...{ className: classNames, href }}>{children}</a>; 
};

Link.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
};

