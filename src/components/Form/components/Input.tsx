// eslint-disable-next-line no-unused-vars
import React, { FC, FocusEvent, ChangeEvent } from "react";
import classNames from "classnames";
import styles from "./Input.module.css";

interface InputProps {
  errorMessage: string;
  value: string;
  placeholder: string;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  name: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  tooltip?: string;
}


export const Input: FC<InputProps> = ({
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

export default Input;
