import classNames from "classnames";

interface BasicHeaderProps {
  title: string;
  subTitle?: string;
  className?: string;
}

export const BasicHeader = ({
  title,
  subTitle,
  className,
}: BasicHeaderProps) => {
  const containerClass = classNames(className);

  return (
    <div className={containerClass}>
      <h2 className="mb-2 font-semibold">{title}</h2>
      <h3 className="mb-8 text-base md:mb-0">{subTitle}</h3>
    </div>
  );
};
