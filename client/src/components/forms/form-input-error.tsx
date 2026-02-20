import { FieldErrors, FieldValues } from "react-hook-form";

interface FormInputErrorProps<T extends FieldValues> {
  errors?: FieldErrors<T>;
  name?: keyof T;
  messages?: string[] | string;
}

export const FormInputError = <T extends FieldValues>({
  errors,
  name,
  messages,
}: FormInputErrorProps<T>) => {
  if (!errors || !name) return null;

  const error = errors[name];

  if (!error) return null;

  return (
    <span className="mb-4 mt-2 block min-h-6 text-xs text-red-500">
      {(error.message as string) || messages}
    </span>
  );
};
