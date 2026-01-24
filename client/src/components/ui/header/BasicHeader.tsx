import classNames from "classnames";
import type { BasicHeaderProps } from "@components/ui/header/types";

export const BasicHeader = ({
  title,
  subTitle,
  className,
  as: HeaderTag = "h2",
}: BasicHeaderProps) => {
  const containerClass = classNames(className?.container);
  const titleClass = classNames("mb-2 font-semibold", className?.title);
  const subtitleClass = classNames(
    "mb-8 text-base md:mb-0",
    className?.subtitle,
  );

  return (
    <div className={containerClass}>
      <HeaderTag className={titleClass}>{title}</HeaderTag>
      {subTitle && <p className={subtitleClass}>{subTitle}</p>}
    </div>
  );
};
