import classNames from "classnames";
import { TextareaHTMLAttributes, forwardRef } from "react";

export const FormTextArea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className = "text-black bg-white", ...props }, ref) => {
  const inputClass = classNames(
    "w-full text-sm rounded-[20px] border border-primary md:mx-0 md:mt-1 py-4 px-3 outline-none placeholder:font-light ",
    {
      // "md:ml-4 md:mb-4 md:w-[65px]": isTypeColor,
    },
    className,
  );

  return (
    <>
      <textarea
        cols={30}
        rows={2}
        className={inputClass}
        ref={ref}
        {...props}
      />
    </>
  );
});
