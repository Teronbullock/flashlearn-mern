import { Link } from "react-router-dom";
import { BtnLinkProps } from "@app-types/btnTypes";
// import './BtnLink.scss';
import classNames from "classnames";

export const BtnLink = ({
  children,
  variant = "none",
  className,
  onClick,
  to,
}: BtnLinkProps) => {
  const linkClass = classNames(
    "text-center inline-flex items-center justify-center",
    { "hover:font-bold": variant == "none" },
    { "min-w-[100px] rounded-[30px] p-[0.625rem]": variant },
    { "bg-primary text-white hover:bg-primary-dark": variant === "primary" },
    { "border-primary border": variant === "outline" },
    className,
  );

  return (
    <Link to={to} onClick={onClick} className={linkClass}>
      {children}
    </Link>
  );
};
