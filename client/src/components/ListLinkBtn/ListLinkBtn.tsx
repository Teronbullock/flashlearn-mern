import { Btn } from "@components/btn";
import { BtnProps } from "@components/btn/BtnTypes";
import classNames from "classnames";

interface ListProps extends BtnProps {
  listItemClass?: string;
}

export const ListLinkBtn = ({ listItemClass, ...props }: ListProps) => {
  return (
    <li className={classNames(listItemClass)}>
      <Btn {...props} />
    </li>
  );
};
