import { BtnLink } from "@components/BtnLink/BtnLink";
import { Btn } from "@components/Btn/Btn";
import { ListItemProps, BtnLinkProps, BtnProps } from "@app-types/btnTypes";
import classNames from "classnames";

export const ListItemLink = ({
  isLink = true,
  type,
  itemClass,
  className,
  ...props
}: ListItemProps) => {
  const isMobileNav = itemClass?.includes("mobile-nav");

  const itemClassList = classNames({ "block py-2": isMobileNav }, itemClass);

  const btnClassList = classNames(
    {
      "no-underline duration-[0.3s] cursor-pointer": type === "mobileNav",
    },
    {
      "border-primary": false,
    },
    className,
  );

  return (
    <li className={itemClassList}>
      {isLink ? (
        <BtnLink className={btnClassList} {...(props as BtnLinkProps)} />
      ) : (
        <Btn {...(props as BtnProps)} />
      )}
    </li>
  );
};
