import { BtnLink } from '@components/BtnLink/BtnLink';
import { BtnLinkProps } from '@app-types/btnTypes';
import classNames from 'classnames';

interface ListProps extends BtnLinkProps {
  listClassName?: string;
}

export const ListLinkItem = ({ listClassName, ...props }: ListProps) => {
  return (
    <li className={classNames(listClassName)}>
      <BtnLink {...props} />
    </li>
  );
};
