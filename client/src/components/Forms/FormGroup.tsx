import classNames from "classnames";

interface FormGroupProps {
  children: React.ReactNode;
  name?: string;
  labelName?: string;
  className?: {
    group?: string;
    label?: string;
  };
}

export const FormGroup = ({
  name,
  labelName,
  children,
  className,
}: FormGroupProps) => {
  const labelClass = classNames(" w-full text-sm", className?.label);
  const containerClass = classNames(
    "w-full",
    { "mb-6": !className?.group },
    className?.group,
  );

  return (
    <div className={containerClass}>
      <label htmlFor={name} className={labelClass}>
        {labelName}
      </label>
      {children}
    </div>
  );
};
