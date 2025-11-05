import { BasicHeader } from "@components/ui/header";
import classNames from "classnames";

interface PageHeaderProps {
  className?: string;
  children?: React.ReactNode;
  data: {
    title: string;
    subTitle?: string;
  };
}

export const PageHeader = ({ data, children, className }: PageHeaderProps) => {
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
