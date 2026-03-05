import type { ButtonProps } from "./types";
import { getButtonClasses } from "./Button.utils";

export const Button = ({
  children,
  className,
  variants,
  ...props
}: ButtonProps) => {
  const buttonClass = getButtonClasses(variants, className);

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};
