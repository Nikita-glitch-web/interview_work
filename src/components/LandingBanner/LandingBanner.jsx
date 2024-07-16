// eslint-disable-next-line no-unused-vars
import React from "react";
import style from "./LandingBanner.module.css";
import { Button } from "../Controls/Button";

export const LandingBanner = () => {
  return (
    <div className={style.banner_content_box}>
      <div className={style.banner_content}>
        <div className={style.banner_text_box}>
          <h1 className={style.banner_title}>
            Test assignment for
            <br /> front-end developer
          </h1>
          <p className={style.bannner_text}>
            What defines a good front-end developer is one that
            <br />
            has skilled knowledge of HTML, CSS, JS with a vast
            <br />
            understanding of User design thinking as theyll be
            <br /> building web interfaces with accessibility in mind.
            <br /> They should also be excited to learn, as the world of
            <br /> Front-End Development keeps evolving.
          </p>
          <Button text="Sign up" />
        </div>
      </div>
    </div>
  );
};
