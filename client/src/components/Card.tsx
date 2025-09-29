import classNames from "classnames";

export interface CardProps {
  slotOne: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Card = ({
  slotOne,
  children,
  className,
  style,
  ...props
}: CardProps) => {
  return (
    <div
      className={classNames(
        "card mx-auto mb-8 w-full rounded-[20px] p-4 md:p-8",
        className,
      )}
      style={style}
      {...props}
    >
      {slotOne}
      {children}
    </div>
  );
};
