import classNames from "classnames";

export interface BasicHeaderClassName {
  container?: string;
  title?: string;
  subtitle?: string;
}

export interface BasicHeaderTitleProps {
  title: string;
  subTitle?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

interface BasicHeaderProps extends BasicHeaderTitleProps {
  classname?: BasicHeaderClassName;
}

export const BasicHeader = ({
  title,
  subTitle,
  classname,
  as: HeaderTag = "h2",
}: BasicHeaderProps) => {
  const containerClass = classNames(classname?.container);
  const titleClass = classNames("mb-2 font-semibold", classname?.title);
  const subtitleClass = classNames(
    "mb-8 text-base md:mb-0",
    classname?.subtitle,
  );

  return (
    <div className={containerClass}>
      <HeaderTag className={titleClass}>{title}</HeaderTag>
      {subTitle && <p className={subtitleClass}>{subTitle}</p>}
    </div>
  );
};
