import { BasicHeader } from "@components/BasicHeader/BasicHeader";
import classNames from "classnames";

interface InnerPageHeaderProps {
  className?: string;
  children?: React.ReactNode;
  data: {
    title: string;
    subTitle?: string;
  };
}

export const InnerPageHeader = ({
  data,
  children,
  className,
}: InnerPageHeaderProps) => {
  const containerClass = classNames(
    "mb-10 flex items-end justify-between",
    className,
  );

  return (
    <header className={containerClass}>
      <BasicHeader {...data} />
      {children}
    </header>
  );
};
