import { Link } from "react-router-dom";
import { LinkProps } from "./BtnTypes";
import { getBtnClasses } from "./btn.utils";

export const BtnLink = ({
  children,
  className,
  variants,
  to,
  ...props
}: LinkProps) => {
  const btnClass = getBtnClasses(variants, className);

  return (
    <Link className={btnClass} to={to} {...props}>
      {children}
    </Link>
  );
};
