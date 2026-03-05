import classNames from "classnames";

type OnSubmit = (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;

interface ClassName {
  container?: string;
  header?: string;
}

interface FormProps {
  children: React.ReactNode;
  title?: string;
  onSubmit: OnSubmit;
  className?: ClassName;
}

export const Form = ({ children, onSubmit, title, className }: FormProps) => {
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
