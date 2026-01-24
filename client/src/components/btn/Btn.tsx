import type { BtnProps } from "./BtnTypes";
import { getBtnClasses } from "./btn.utils";

export const Btn = ({ children, className, variants, ...props }: BtnProps) => {
  const btnClass = getBtnClasses(variants, className);

  return (
    <button className={btnClass} {...props}>
      {children}
    </button>
  );
};
