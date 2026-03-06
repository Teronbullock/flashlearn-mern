import { Link } from "react-router-dom";
import { LinkProps } from "./types";
import { getButtonClasses } from "./Button.utils";
import classNames from "classnames";

export const ButtonLink = ({
  children,
  className,
  variants,
  to,
  disabled,
  ...props
}: LinkProps) => {
  const buttonClass = getButtonClasses(
    variants,
    classNames(className, {
      "opacity-50 pointer-events-none cursor-not-allowed": disabled,
    }),
  );

  if (disabled) {
    return (
      <span className={buttonClass} {...props}>
        {children}
      </span>
    );
  }

  return (
    <Link className={buttonClass} to={to} {...props}>
      {children}
    </Link>
  );
};
