import './FormGrop.scss';

interface FormGroupProps {
  labelName: string;
  inputObj: {
    type: string;
    name: string;
    value: string;
    className?: string;
    placeholder: string;
    required?: boolean;
    disabled?: boolean;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormGroup = ({ labelName, onChange, inputObj }: FormGroupProps ) => {
  return (
    <div className="form__group w-full mb-4">
       <label htmlFor={inputObj.name} className='form__label w-full text-xl'>{labelName}</label>
      <input
        className={`form__input w-full text-black text-xl bg-white rounded-md border-solid border-2 border-black  outline-none md:mt-1 md:mx-0 md:mb-6 md:p-4 md:text-2xl py-1 px-2 ${inputObj.className}`}
        type={inputObj.type}
        name={inputObj.name}
        value={inputObj.value}
        onChange={onChange}
        placeholder={inputObj.placeholder}
        required={inputObj.required}
        disabled={inputObj.disabled}
      />
    </div>
  );
}

export default FormGroup;