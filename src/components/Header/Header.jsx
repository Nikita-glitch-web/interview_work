// eslint-disable-next-line no-unused-vars
import React from "react";
import style from "./Header.module.css";
import img from "./header_logo.png";
import { Button } from "../Controls/Button";

export const Header = () => {
  return (
    <header className={style.header_wrapper}>
      <div className={style.header_content}>
        <div className={style.header_logo_box}>
          <div className={style.header_logo_wrapper}>
            <img src={img} />
          </div>
          <h1 className={style.header_logo_text}>TESTTASK</h1>
        </div>
        <div className={style.header_nav_wrapper}>
          <div className={style.header_btn_wrapper}>
            <Button text="Users" />
          </div>
          <div className={style.header_btn_wrapper}>
            <Button text="Sign up" />
          </div>
        </div>
      </div>
    </header>
  );
};
