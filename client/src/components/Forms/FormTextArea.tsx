import classNames from "classnames";
import { FormInputBaseProps } from "@components/Forms/FormTypes";

export const FormTextArea = ({
  className = "text-black bg-white",
  name,
  ...props
}: FormInputBaseProps) => {
  const textClass = classNames(className);

  return (
    <>
      <textarea id={name} cols={30} rows={2} className={textClass} {...props} />
    </>
  );
};
