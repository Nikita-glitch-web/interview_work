// eslint-disable-next-line no-unused-vars
import React, { FC, ReactNode } from "react";
import style from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  onClick = () => {},
  disabled = false,
  type = "button",
  className = "",
}) => {
  const classNames = [
    style.button,
    className,
    disabled ? style.disabled : "",
  ].join(" ");

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

