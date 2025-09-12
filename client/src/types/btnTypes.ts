import { To } from 'react-router-dom';

interface BtnBase {
  children: React.ReactNode;
  className?: string;
  defaultStyle?: boolean;
}

export interface BtnProps extends BtnBase {
  type?: 'submit' | 'reset' | 'button';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface BtnLinkProps extends BtnBase {
  to: To;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}
