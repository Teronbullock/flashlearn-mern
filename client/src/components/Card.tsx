import classNames from "classnames";

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  spacing?: boolean;
  border?: boolean;
}

export const Card = ({
  children,
  className,
  spacing = true,
  border = true,
  ...props
}: CardProps) => {
  const cardClass = classNames(
    "mx-auto rounded-[20px] overflow-auto",
    {
      "mb-8 p-4 md:p-8": spacing,
      border: border,
    },
    className,
  );

  return (
    <div className={cardClass} {...props} data-js="card">
      {children}
    </div>
  );
};
