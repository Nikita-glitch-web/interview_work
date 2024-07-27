import PropTypes from "prop-types";
import InputMask from "react-input-mask";
import { Input } from "./Input";
import styles from "./Input.module.css";

export const InputMasked = ({
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

InputMasked.propTypes = {
  errorMessage: PropTypes.string,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onFocus: PropTypes.func,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};
