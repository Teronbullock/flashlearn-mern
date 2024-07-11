import classNames from "classnames";
import { FormInputProps } from "../../types/form-types";

/**
 * -- FormInput Component --
 * @param {string} labelName - The label name for the input field.
 * @param {Object} inputProps - The input object containing the input field properties.
 * @param {string} [inputProps.type='text'] - The input field type (optional, defaults to 'text').
 * @param {string} inputProps.name - The input field name.
 * @param {string} [inputProps.value] - The input field value (optional).
 * @param {string} [inputProps.className] - The input field class name (optional).
 * @param {string} [inputProps.placeholder] - The input field placeholder (optional).
 * @param {boolean} [inputProps.required=false] - Whether the input field is required (optional, defaults to false).
 * @param {boolean} [inputProps.disabled=false] - Whether the input field is disabled (optional, defaults to false).
 * @param {function} inputProps.onChange - The function to handle the input field change event.
 * 
 * @returns {JSX.Element} The rendered input field component.
 */

const FormInput = ({ 
  labelName, 
  inputProps
}: FormInputProps ) => {

  const { 
    type = 'text',
    name,
    value,
    className,
    placeholder,
    required,
    disabled,
    onChange
  } = inputProps;

  let placeholderAttr = null;
  let isTypeColor;

  if (type === 'color') {
    isTypeColor = true;
  }

  const inputClassName = classNames({
    'form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl py-1 px-2': !isTypeColor,
    'md:ml-4 md:mb-4 md:w-[65px]' : isTypeColor,
  }, className)

  if (placeholder) {
    placeholderAttr = {
      placeholder: placeholder,
    };
  }

  return (
    <div className="form__input-container w-full mb-4">
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
          name={name}
          value={value}
          className={classNames('form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl py-1 px-2', className)}
          onChange={onChange}
          {...placeholderAttr}
          required={required}
        />) : (
          <input
            className={inputClassName}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            {...placeholderAttr}
            required={required}
            disabled={disabled}
          />
        )}
    </div>
  );
}

export default FormInput;