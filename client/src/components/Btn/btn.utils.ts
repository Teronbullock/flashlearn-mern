// src/utils/styleUtils.ts
import classNames from "classnames";
import { BtnVariants } from "./BtnTypes";

export const getBtnClasses = (
  variants?: BtnVariants,
  className?: string,
  disabled?: boolean,
): string => {
  return classNames(
    "inline-flex items-center justify-center no-underline hover:duration-[0.3s] hover:cursor-pointer text-sm",
    // Style Variant
    {
      "btn p-[0.75rem] rounded-full": variants?.style === "btn",
    },
    // Color Variant
    {
      "bg-primary text-white hover:bg-primary-dark":
        variants?.color === "primary",
      "bg-white text-primary hover:bg-primary-light hover:text-white":
        variants?.color === "white",
      "border border-primary text-black hover:bg-white hover:text-black":
        variants?.color === "outline-primary",
      "border border-white text-white hover:bg-white hover:text-primary":
        variants?.color === "outline-white",
      "border border-black bg-white text-black hover:bg-black hover:text-white":
        variants?.color === "outline-black",
    },
    // Size Variant
    {
      "min-w-[100px]": variants?.size === "xs" || variants?.size === undefined,
      "min-w-[118px]": variants?.size === "sm",
      "min-w-[141px]": variants?.size === "md",
      "min-w-[200px]": variants?.size === "lg",
      "min-w-[300px]": variants?.size === "xl",
      "w-full": variants?.size === "full",
    },
    // Disabled state
    {
      "opacity-50 pointer-events-none cursor-not-allowed": disabled,
    },

    // External Classes
    className,
  );
};
