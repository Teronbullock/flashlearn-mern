import './Form.scss';
import BtnClose from '../../../components/BtnClose/BtnClose';


interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  sectionClass?: string;
  sectionHeaderTitle?: string;
  sectionHeaderClass?: string;
}

/**
 * 
 * @param onSubmit [function] - function for form submit
 * @param children [React.ReactNode] - children for form
 * @param sectionClass [string] - class name for section
 * @param sectionHeaderTitle [string] - title for section header
 * @param sectionHeaderClass [string] - class name for section header
 * @returns 
 */
const Form = ({ onSubmit, children, sectionClass, sectionHeaderTitle, sectionHeaderClass = 'my-4' }: FormProps) => {
  return (
    <section className={`form-container container mt-[25%] ${sectionClass}`}>
      <div className="form relative p-4 w-full min-h-[450px] text-black bg-white my-0 mx-auto rounded-2xl border-solid border-white border-[3px] md:py-* md:px-20 md:max-w-[800px]">
        <BtnClose />
        <div className="form__header">
          <h2 className={`form__title mx-0 ${sectionHeaderClass}`}>
            {sectionHeaderTitle}
          </h2>
        </div>
        <form onSubmit={onSubmit} className="form__body mb-8">
          {children}
        </form>
      </div>
    </section>
  );
}

export default Form;