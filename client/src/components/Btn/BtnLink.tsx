import { Link } from "react-router-dom";
import { LinkProps } from "./BtnTypes";
import { getBtnClasses } from "./btn.utils";
import classNames from "classnames";

export const BtnLink = ({
  children,
  className,
  variants,
  to,
  disabled,
  ...props
}: LinkProps) => {
  const btnClass = getBtnClasses(
    variants,
    classNames(className, {
      "opacity-50 pointer-events-none cursor-not-allowed": disabled,
    }),
  );

  if (disabled) {
    return (
      <span className={btnClass} {...props}>
        {children}
      </span>
    );
  }

  return (
    <Link className={btnClass} to={to} {...props}>
      {children}
    </Link>
  );
};
