import { Btn } from '@components/Btn/Btn';
import { BtnProps } from '@app-types/btnTypes';
import classNames from 'classnames';

interface ListProps extends BtnProps {
  listClassName?: string;
}

export const ListLinkBtn = ({ listClassName, ...props }: ListProps) => {
  return (
    <li className={classNames(listClassName)}>
      <Btn {...props} />
    </li>
  );
};
