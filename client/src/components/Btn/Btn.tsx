import "./btn.scss";
import classNames from "classnames";
import { BtnProps } from "@app-types/btnTypes";

/**
 * -- Btn Component --
 * @param className {string} - class name for button
 * @param children [React.ReactNode] - children for button
 * @param type {string} - button attribute type (submit, reset, button)
 * The type attribute should only be used when the tag is 'button'.
 * @param onClick {function} - function for button click
 * @param defaultStyle {boolean} - boolean for default style -
 * Default is true
 * @returns
 */
export const Btn = ({
  children,
  variant = "primary",
  className,
  onClick,
  type,
}: BtnProps) => {
  const styles = {
    primary: "bg-primary hover:bg-primary-dark",
    secondary: "border-primary hover:bg-white",
    tertiary: "",
  };

  const btnClass = classNames(
    { "text-center inline-flex border-[30px]": variant !== "none" },
    { "bg-primary hover:bg-primary-dark": variant === "primary" },
  );

  return (
    <button className={btnClass} type={type} onClick={onClick}>
      {children}
    </button>
  );
  // }
};
