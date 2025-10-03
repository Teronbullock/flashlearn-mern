import classNames from "classnames";

export interface CardProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card = ({ children, className, style, ...props }: CardProps) => {
  const cardClass = classNames(
    "mx-auto mb-8 rounded-[20px] p-4 md:p-8",
    className,
  );

  return (
    <div className={cardClass} style={style} {...props} data-js="card">
      {children}
    </div>
  );
};
