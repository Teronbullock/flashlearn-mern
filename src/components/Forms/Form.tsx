import classNames from 'classnames';
import './Form.scss';
// import BtnClose from '../BtnClose/BtnClose';


interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  formObj?: {
    title?: string;
    className?: string;
    hasTitle?: boolean;
    titleClassName?: string;
    dataType? : string;
  };
}

/**
 * -- Form Component --
 * 
 * @param onSubmit [function] - function for form submit
 * @param children [React.ReactNode] - children for form
 * @param formObj [object] - object for form
 * @param formObj.title [string] - title for form
 * @param formObj.className [string] - class name for form
 * @param formObj.hasTitle [boolean] - boolean value to determine if form has title
 * @param formObj.titleClassName [string] - class name for form title
 * 
 * 
 * @returns 
 * 
 */
const Form = ({ onSubmit, children, formObj }: FormProps) => {
  const { 
    hasTitle = false,
    title,
    className = 'mb-8',
    titleClassName,
    dataType
  } = formObj || {};

  let dataTypeAttr = {};
  if (dataType) {
    dataTypeAttr = {
      'data-js': dataType,
    };
  }

  return (
    <form 
      onSubmit={onSubmit}
      className={classNames('form', className)}
      {...dataTypeAttr}
    >
      {hasTitle ? (
        <div className="form__title-container">
          <h2 className={classNames('form__title mx-0 mb-4', titleClassName)}>
            {title}
          </h2>
        </div>
      ) : null}
      {children}
    </form>
  );
}

export default Form;