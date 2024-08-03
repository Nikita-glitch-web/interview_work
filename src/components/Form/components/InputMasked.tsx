import React, { FC, ReactNode, FocusEvent, ChangeEvent } from "react";
import InputMask from "react-input-mask";
import { Input } from "./Input";
import styles from "./Input.module.css";

interface InputProps {
  value: string;
  placeholder: string;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void; //=> void обозначает тип функции, который ничего не возвращает
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

//FC functional-component
export const InputMasked: FC<InputProps> = ({
  value,
  placeholder,
  onFocus,
  onBlur,
  onChange,
  name,
}) => {
  return (
    <div>
      <InputMask
        mask="+380 (99) 999-99-99"
        id="phone"
        {...{ value, placeholder, onFocus, onChange, onBlur, name }}
      >
        {(inputProps) => <Input {...{ ...inputProps }} placeholder="Phone" />}
      </InputMask>
      <label className={styles.label_phone} htmlFor="phone">
        +38 (XX) XXX - XX - XX
      </label>
    </div>
  );
};

