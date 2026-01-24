import classNames from "classnames";

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  spacing?: boolean;
  border?: boolean;
}

/**
 * A highly reusable container component with standardized spacing and border logic.
 * @see {@link CardProps} for configuration options.
 */
export const Card = ({
  children,
  className,
  spacing = true,
  border = true,
  ...props
}: CardProps) => {
  const cardClass = classNames(
    "rounded-[20px] overflow-auto",
    {
      "mb-8 p-4 md:p-8": spacing,
      border: border,
    },
    className,
  );

  return (
    <div className={cardClass} {...props} data-name="card">
      {children}
    </div>
  );
};
