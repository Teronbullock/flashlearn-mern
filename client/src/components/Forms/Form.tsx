import { Card } from "@components/Card";
import classNames from "classnames";

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

/**
 *  -- Form Component --
 * @param {React.ReactNode} props.children
 * @param {FormEventHandler<HTMLFormElement>} props.onSubmit
 * @param {string} props.title - Optional
 * @param {string} props.className - Optional
 * @returns
 */
const Form = ({ children, onSubmit, title, className }: FormProps) => {
  return (
    <Card className={classNames("form-container", className)}>
      <form onSubmit={onSubmit} className="form">
        {title && (
          <div className="form__title-container">
            <h2 className={classNames("form__title mx-0 mb-4")}>{title}</h2>
          </div>
        )}
        {children}
      </form>
    </Card>
  );
};

export default Form;
