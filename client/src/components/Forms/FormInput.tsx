import classNames from "classnames";

interface FormInputProps {
  labelName: string;
  type?: string;
  name: string;
  value: string | undefined | '';
  className?: string;
  containerClassName?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean; 
  autoFocus?: boolean;
  datatype?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement  | HTMLTextAreaElement>) => void;
}

/**
 * -- FormInput Component --
 * @param {string} labelName - The label name for the input field.
 * @param {string} type - The input field type.
 * @param {string} [inputProps.type='text'] - The input field type (optional, defaults to 'text').
 * @param {string} inputProps.name - The input field name.
 * @param {string} [inputProps.value] - The input field value (optional).
 * @param {string} [inputProps.className] - The input field class name (optional).
 * @param {string} [inputProps.containerClassName] - The input field container class name (optional).
 * @param {string} [inputProps.placeholder] - The input field placeholder (optional).
 * @param {boolean} [inputProps.required=false] - Whether the input field is required (optional, defaults to false).
 * @param {boolean} [inputProps.disabled=false] - Whether the input field is disabled (optional, defaults to false).
 * @param {function} inputProps.onChange - The function to handle the input field change event.
 * 
 * @returns {JSX.Element} The rendered input field component.
 */

const FormInput = ({ 
  labelName, 
  type = 'text',
  className = 'text-black bg-white',
  name,
  containerClassName,
  ...props
}: FormInputProps ) => {
  let isTypeColor;

  if (type === 'color') {
    isTypeColor = true;
  }

  const inputClassName = classNames({
    'form__input w-full text-xl rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl py-1 px-2': !isTypeColor,
    'md:ml-4 md:mb-4 md:w-[65px]' : isTypeColor,
  }, className)

  return (
    <div className={classNames('form__input-container w-full mb-4', containerClassName)}>
      {labelName && name && (
        <label htmlFor={name} className='form__label w-full text-xl'>
          {labelName}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea 
          id={name}
          cols={30} 
          rows={2}
          className={classNames('form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl py-1 px-2', className)}
          {...props}
        />) : (
          <input
            className={inputClassName}
            type={type}
            {...props}
          />
        )}
    </div>
  );
}

export default FormInput;