import { To } from "react-router-dom";

export interface BtnVariants {
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "white"
    | "outline"
    | "outline-primary"
    | "outline-white"
    | "outline-black"
    | "none";
  size?: undefined | "xs" | "sm" | "md" | "lg" | "xl" | "full";
  style?: "btn";
}

interface BtnBase {
  children: React.ReactNode;
  className?: string;
  variants?: BtnVariants;
}

export interface BtnProps extends BtnBase {
  type?: "submit" | "reset" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface LinkProps extends BtnBase {
  to: To;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}
