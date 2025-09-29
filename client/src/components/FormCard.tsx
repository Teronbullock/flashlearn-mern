import { SectionHeader, SectionHeaderProps } from "@components/SectionHeader";
import classNames from "classnames";

export interface FormField {
  name: string;
  placeholder: string;
  type: string;
  icon?: React.ReactNode;
}

interface SlotProp {
  header?: string;
  form?: string;
  inputs?: string;
  button?: string;
}

interface FormCardProps {
  header: SectionHeaderProps;
  fields: FormField[];
  buttonText: string;
  className?: string;
  slotProps?: SlotProp;
}

export const FormCard = ({
  className,
  buttonText,
  header,
  fields,
  slotProps,
}: FormCardProps) => {
  const containerClass = classNames("w-full p-6 text-white", className);

  const inputClass = classNames(
    "w-full rounded-xl px-4 py-3 text-black focus:outline-none",
    slotProps?.inputs,
  );

  const formClass = classNames("flex flex-col gap-4", slotProps?.form);

  const buttonClass = classNames(
    "rounded-xl bg-white py-3 font-semibold text-[#C2391C] transition hover:bg-gray-200",
    slotProps?.button,
  );

  return (
    <div className={containerClass}>
      <SectionHeader {...header} icons={false} className={slotProps?.header} />

      <form className={formClass}>
        {fields.map((field) => (
          <div key={field.name} className="relative">
            <input
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              className={inputClass}
            />
            {field.icon && (
              <span className="absolute right-3 top-3 text-sm text-gray-400">
                {field.icon}
              </span>
            )}
          </div>
        ))}
        <button type="submit" className={buttonClass}>
          {buttonText}
        </button>
      </form>
    </div>
  );
};
