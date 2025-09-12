import { Link } from 'react-router-dom';
import { BtnLinkProps } from '@app-types/btnTypes';
// import './BtnLink.scss';
import classNames from 'classnames';

export const BtnLink = ({
  children,
  to,
  onClick,
  defaultStyle,
  className,
}: BtnLinkProps) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={classNames({ btn: defaultStyle }, className)}
    >
      {children}
    </Link>
  );
};
