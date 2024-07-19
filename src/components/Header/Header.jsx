// eslint-disable-next-line no-unused-vars
import React from "react";
import style from "./Header.module.css";
import img from "./header_logo.png";
import { Link } from "../Controls";

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
            <Link text="Users" href={"#teamMembers"} className={style.test} />
          </div>
          <div className={style.header_btn_wrapper}>
            <Link text="Sign up" href={"#signUpForm"} className={style.test} />
          </div>
        </div>
      </div>
    </header>
  );
};
