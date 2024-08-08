import React, { FC, FocusEvent, ChangeEvent } from "react";
import InputMask from "react-input-mask";
import { Input } from "./Input";
import styles from "./Input.module.css";

interface InputProps {
  id: string;
  value: string;
  placeholder: string;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

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
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        name={name}
      >
        {(inputProps: any) => (
          <Input {...inputProps} placeholder="Phone" />
        )}
      </InputMask>
      <label className={styles.label_phone} htmlFor="phone">
        +38 (XX) XXX - XX - XX
      </label>
    </div>
  );
};
