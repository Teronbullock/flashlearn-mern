import classNames from "classnames";

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  title?: string;
  className?: {
    container?: string;
    header?: string;
  };
}

export const FormLayout = ({
  children,
  onSubmit,
  title,
  className,
}: FormProps) => {
  const headerClass = classNames("mx-0 mb-4", className?.header);

  return (
    <div className={className?.container}>
      <form onSubmit={onSubmit} className="form">
        {title && (
          <div className="form__title-container">
            <h2 className={headerClass}>{title}</h2>
          </div>
        )}
        {children}
      </form>
    </div>
  );
};
