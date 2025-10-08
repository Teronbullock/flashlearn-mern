import classNames from "classnames";

interface MainProps {
  children: React.ReactNode;
  isDefaultStyle?: boolean;
  className?: string;
}

export const Main = ({
  children,
  className,
  isDefaultStyle = true,
}: MainProps) => {
  const mainClass = classNames(
    {
      "md:pt-23 w-8xl mx-auto min-h-screen px-4 mb-20": isDefaultStyle,
    },
    className,
  );

  return <main className={mainClass}>{children}</main>;
};
