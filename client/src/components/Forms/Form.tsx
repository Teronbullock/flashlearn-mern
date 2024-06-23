import classNames from 'classnames';
import './Form.scss';
import { FormProps } from './form-types';

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
const Form = ({ children, isCard = true, formData }: FormProps) => {
  const { 
    className = 'mb-8',
    dataType,
    onSubmit,
    hasTitle = false,
    title,
    titleClassName
  } = formData || {};
  
  let dataTypeAttr = {};
  
  const formWrapperClass = classNames({
    'card bg-white text-black rounded-md w-full mx-auto mb-12 p-8': isCard
  }, className);

  if (dataType) {
    dataTypeAttr = {
      'data-js': dataType,
    };
  }

  return (
    <div className={formWrapperClass}>
      <form 
        onSubmit={onSubmit}
        className='form'
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
    </div>
  );
}

export default Form;