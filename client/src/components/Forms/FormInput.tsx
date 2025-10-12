import classNames from "classnames";
import { FormInputBaseProps } from "@components/forms/types/FormTypes";

interface FormInputProps extends FormInputBaseProps {
  type: "text" | "email" | "password" | "number" | "tel" | "url";
}

export const FormInput = ({
  className = "text-black bg-white",
  name,
  ...props
}: FormInputProps) => {
  const inputClass = classNames(
    "w-full text-sm rounded-[20px] border border-secondary md:mx-0 md:mt-1 py-4 px-3 outline-none placeholder:font-light ",
    {
      // "md:ml-4 md:mb-4 md:w-[65px]": isTypeColor,
    },
    className,
  );

  return (
    <>
      <input id={name} className={inputClass} {...props} />
    </>
  );
};
