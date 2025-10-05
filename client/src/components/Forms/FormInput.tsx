import classNames from "classnames";
import { FormInputBaseProps } from "@components/Forms/FormTypes";

interface FormInputProps extends FormInputBaseProps {
  type?: "text" | "textarea" | "email" | "password";
}

export const FormInput = ({
  type = "text",
  className = "text-black bg-white",
  name,
  ...props
}: FormInputProps) => {
  const inputClass = classNames(
    "w-full text-sm rounded-[20px] border border-secondary bg-white md:mx-0 md:mt-1  py-4 px-3 outline-none placeholder:font-light ",
    {
      // "md:ml-4 md:mb-4 md:w-[65px]": isTypeColor,
    },
    className,
  );

  return (
    <>
      <input id={name} className={inputClass} type={type} {...props} />
    </>
  );
};
