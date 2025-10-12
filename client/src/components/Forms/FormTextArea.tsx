import classNames from "classnames";
import { FormInputBaseProps } from "@components/forms/types/FormTypes";

export const FormTextArea = ({
  className = "text-black bg-white",
  name,
  ...props
}: FormInputBaseProps) => {
  const inputClass = classNames(
    "w-full text-sm rounded-[20px] border border-secondary md:mx-0 md:mt-1 py-4 px-3 outline-none placeholder:font-light ",
    {
      // "md:ml-4 md:mb-4 md:w-[65px]": isTypeColor,
    },
    className,
  );

  return (
    <>
      <textarea
        id={name}
        cols={30}
        rows={2}
        className={inputClass}
        {...props}
      />
    </>
  );
};
