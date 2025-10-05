import { Link, To } from "react-router-dom";
import classNames from "classnames";

interface BtnVariants {
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "white"
    | "outline"
    | "outline-primary"
    | "outline-white"
    | "none";
  size?: undefined | "sm" | "md" | "lg" | "xl" | "full";
  style?: "btn";
}

interface BtnBase {
  children: React.ReactNode;
  className?: string;
  variants?: BtnVariants;
}

interface HTMLBtnProps extends BtnBase {
  el?: "btn";
  type?: "submit" | "reset" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface LinkProps extends BtnBase {
  el: "link";
  to: To;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export type BtnProps = HTMLBtnProps | LinkProps;

export const Btn = (props: BtnProps) => {
  // default here
  const el = props.el ?? "btn";

  const { children, className, variants, ...rest } = props;

  const btnClass = classNames(
    "inline-flex items-center justify-center no-underline hover:duration-[0.3s] hover:cursor-pointer",
    {
      "btn p-[0.75rem] rounded-full h-[39px] md:h-[45px]":
        el === "btn" || variants?.style === "btn",
    },
    {
      "bg-primary text-white hover:bg-primary-dark":
        variants?.color === "primary",
      "bg-white text-primary hover:bg-primary-light hover:text-white":
        variants?.color === "white",
      "border border-primary text-black hover:bg-white hover:text-black":
        variants?.color === "outline-primary",
      "border border-white text-white hover:bg-white hover:text-primary":
        variants?.color === "outline-white",
    },
    {
      "min-w-[100px]": variants?.size === "sm" || variants?.size === undefined,
      "min-w-[141px]": variants?.size === "md",
      "w-full": variants?.size === "full",
    },
    className,
  );

  // return the link element
  if (el === "link") {
    const { to, onClick, ...linkRest } = rest as LinkProps;
    return (
      <Link className={btnClass} to={to} onClick={onClick} {...linkRest}>
        {children}
      </Link>
    );
  } else {
    const { type, onClick, ...btnRest } = rest as HTMLBtnProps;
    return (
      <button className={btnClass} type={type} onClick={onClick} {...btnRest}>
        {children}
      </button>
    );
  }
};
