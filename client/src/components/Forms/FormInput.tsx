import classNames from "classnames";

interface classNameProps {
  input?: string;
  container?: string;
}

interface FormInputProps {
  labelName: string;
  type?: "text" | "textarea" | "email" | "password";
  name: string;
  value: string | undefined | "";
  className?: classNameProps;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  datatype?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export const FormInput = ({
  labelName,
  type = "text",
  className = { input: "text-black bg-white" },
  name,
  ...props
}: FormInputProps) => {
  // let isTypeColor;

  // if (type === "color") {
  //   isTypeColor = true;
  // }

  const containerClass = classNames(
    "form__input-container mb-4 w-full",
    className.container,
  );

  const inputClass = classNames(
    "w-full text-sm rounded-[20px] border border-secondary bg-white md:mx-0 md:mt-1 md:p-4 py-1 px-2 outline-none ",
    {
      // "md:ml-4 md:mb-4 md:w-[65px]": isTypeColor,
    },
    className.input,
  );

  return (
    <div className={containerClass}>
      {labelName && name && (
        <label htmlFor={name} className="form__label w-full text-sm">
          {labelName}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          id={name}
          cols={30}
          rows={2}
          className={inputClass}
          {...props}
        />
      ) : (
        <input id={name} className={inputClass} type={type} {...props} />
      )}
    </div>
  );
};
