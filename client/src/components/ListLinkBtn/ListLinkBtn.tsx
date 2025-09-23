import { Btn } from "@components/Btn/Btn";
import { BtnProps } from "@/components/Btn/btnTypes";
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
