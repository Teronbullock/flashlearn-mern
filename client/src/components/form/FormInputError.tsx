import { FieldErrors, FieldValues } from "react-hook-form";

interface FormInputErrorProps<T extends FieldValues> {
  errors?: FieldErrors<T>;
  name?: keyof T;
  message?: string[] | string;
}

export const FormInputError = <T extends FieldValues>({
  errors,
  name,
  message,
}: FormInputErrorProps<T>) => {
  let error;

  if (message) {
    error = message;
  }

  if (errors && name) {
    error = errors[name]?.message;
  }

  return (
    <span className="mb-4 mt-2 block min-h-5 text-xs text-red-500">
      {error as string}
    </span>
  );
};
