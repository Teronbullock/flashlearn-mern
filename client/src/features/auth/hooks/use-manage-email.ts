import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLoginSchema, type AuthLoginType } from "@flashlearn/schema-db";
import { apiRequest } from "@lib/api";

export const useManageEmail = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthLoginType>({
    resolver: zodResolver(AuthLoginSchema),
  });

  const onSubmit: SubmitHandler<AuthLoginType> = async (formData) => {
    const res = await apiRequest({
      method: "put",
      url: `/profile/update-email`,
      data: {
        user_email: formData.email,
        user_pass: formData.pass,
      },
      token: token,
    });
  };

  return { register, handleSubmit, errors, onSubmit };
};
