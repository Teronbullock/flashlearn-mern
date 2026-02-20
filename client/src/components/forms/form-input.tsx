import classNames from "classnames";
import { InputHTMLAttributes } from "react";

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "email" | "password" | "number" | "tel" | "url";
}

export const FormInput = ({
  className = "text-black bg-white",
  ...props
}: FormInputProps) => {
  const inputClass = classNames(
    "w-full text-sm rounded-[20px] border border-primary md:mx-0 md:mt-1 py-4 px-3 outline-none placeholder:font-light ",
    {
      // "md:ml-4 md:mb-4 md:w-[65px]": isTypeColor,
    },
    className,
  );

  return (
    <>
      <input id={props.name} className={inputClass} {...props} />
    </>
  );
};
