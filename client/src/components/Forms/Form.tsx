import { Card } from "@components/Card";
import classNames from "classnames";

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  title?: string;
  className?: {
    container?: string;
    header?: string;
  };
  card?: boolean;
}

/**
 *  -- Form Component --
 * @param {React.ReactNode} props.children
 * @param {FormEventHandler<HTMLFormElement>} props.onSubmit
 * @param {string} props.title - Optional
 * @param {string} props.className - Optional
 * @returns
 */
export const Form = ({
  children,
  onSubmit,
  title,
  className,
  card = true,
}: FormProps) => {
  const headerClass = classNames("mx-0 mb-4", className?.header);

  const formContent = (
    <form onSubmit={onSubmit} className="form">
      {title && (
        <div className="form__title-container">
          <h2 className={headerClass}>{title}</h2>
        </div>
      )}
      {children}
    </form>
  );

  return card ? (
    <Card className={className?.container}>{formContent}</Card>
  ) : (
    <div className={className?.container}>{formContent}</div>
  );
};
