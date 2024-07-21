import InputMask from "react-input-mask";
import { Input } from "./Input";
import styles from "./Input.module.css";


export const InputMasked = () => {
  return (
    <div>
      <InputMask mask="+380 (99) 999-99-99" id="phone" placeholder="">
        {(inputProps) => <Input {...inputProps} placeholder="Phone" />}
      </InputMask>
      <label className={styles.label_phone}  htmlFor="phone">+38 (XXX) XXX - XX - XX</label>
    </div>
  );
};
