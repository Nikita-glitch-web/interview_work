// eslint-disable-next-line no-unused-vars
import React from "react";
import style from "./Header.module.css";
import { Link } from "../Controls";

export const Header = () => {
  return (
    <header className={style.header_wrapper}>
      <div className={style.header_content}>
        <div className={style.header_logo_box}>
          <div className={style.header_logo_wrapper}>
            <img src="./images/header_logo.png" />
          </div>
          <h1 className={style.header_logo_text}>TESTTASK</h1>
        </div>
        <div className={style.header_nav_wrapper}>
          <div className={style.header_btn_wrapper}>
            <Link href={"#teamMembers"} className={style.test} >Users</Link>
          </div>
          <div className={style.header_btn_wrapper}>
            <Link href={"#signUpForm"} className={style.test} >Sign up</Link>
          </div>
        </div>
      </div>
    </header>
  );
};
