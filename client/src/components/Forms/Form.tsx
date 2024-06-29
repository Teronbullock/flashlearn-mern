import classNames from 'classnames';
import './Form.scss';
import { FormProps } from '../../types/form-types';


/**
 * -- Form Component --
 * 
 * @param onSubmit [function] - function for form submit
 * @param children [React.ReactNode] - children for form
 * @param isCard [boolean] - boolean value to determine if 
 * form is card
 * 
 *  -- formData [object] - object for form data --
 * @param formObj [object] - object for form
 * @param formObj.title [string] - title for form
 * @param formObj.className [string] - class name for form
 * @param formObj.hasTitle [boolean] - boolean value to 
 * determine if form has title
 * @param formObj.titleClassName [string] - class name for 
 * form title
 * 
 * @returns 
 */
const Form = ({ 
  children,
  className,
  dataType,
  onSubmit,
  hasTitle = false,
  title,
  titleClassName,
  id
}: FormProps) => {
  
  let dataTypeAttr = {};
  let formId;

  if (dataType) {
    dataTypeAttr = {
      'data-js': dataType,
    };
  }

  if (id) {
    formId = {'id': `form-${id}`};
  }

  return (
    <form 
      {...formId}
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