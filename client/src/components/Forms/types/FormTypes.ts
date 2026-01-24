export interface FormInputBaseProps {
  name: string;
  value?: string | undefined | "";
  className?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  datatype?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export interface FormInputProps extends FormInputBaseProps {
  type: "text" | "email" | "password" | "number" | "tel" | "url";
}
