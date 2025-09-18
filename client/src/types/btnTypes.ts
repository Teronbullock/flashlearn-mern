import { To } from "react-router-dom";

interface BtnBase {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "none";
}

export interface BtnProps extends BtnBase {
  type?: "submit" | "reset" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface BtnLinkProps extends BtnBase {
  to: To;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export type ListItemProps = (BtnProps | BtnLinkProps) & {
  isLink?: boolean;
  type?: string;
  itemClass?: string;
};
