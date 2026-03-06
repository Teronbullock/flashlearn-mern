import { To } from "react-router-dom";

export interface ButtonVariants {
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

interface ButtonBase {
  children: React.ReactNode;
  className?: string;
  variants?: ButtonVariants;
  disabled?: boolean;
}

export interface ButtonProps extends ButtonBase {
  type?: "submit" | "reset" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface LinkProps extends ButtonBase {
  to: To;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}
