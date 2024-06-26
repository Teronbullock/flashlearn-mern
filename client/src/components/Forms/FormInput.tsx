import classNames from "classnames";
import { FormInputProps } from "../../types/form-types";

/**
 * -- FormInput Component --
 * @param labelName - The label name for the input field
 * 
 * @param inputObj - The input object containing the input field properties
 * @param inputObj.type - The input field type
 * @param inputObj.isLabel - The boolean value to determine if the label should be displayed
 * @param inputObj.name - The input field name
 * @param inputObj.value - The input field value
 * @param inputObj.className - The input field class name
 * @param inputObj.placeholder - The input field placeholder
 * @param inputObj.required - The boolean value to determine if the input field is required
 * @param inputObj.disabled - The boolean value to determine if the input field is disabled
 * 
 * @param onChange - The function to handle the input field change event
 * @returns 
 */
const FormInput = ({ 
  labelName, 
  onChange, 
  type = 'text',
  isLabel = true,
  name,
  value,
  className,
  placeholder,
  required,
  disabled

}: FormInputProps ) => {
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
      {isLabel ? (
        <label htmlFor={name} className='form__label w-full text-xl'>{labelName}</label>
      ) : null}
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