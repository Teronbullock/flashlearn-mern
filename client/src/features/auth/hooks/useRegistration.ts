import { useNavigate } from "react-router";
import { apiRequest, type ApiErrorObject } from "@lib/api";
import { authRegSchema, type AuthRegType } from "@flashlearn/schema-db";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@feats/auth/context/AuthContext";

export const useRegistration = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<AuthRegType>({
    resolver: zodResolver(authRegSchema),
  });

  const onSubmit: SubmitHandler<AuthRegType> = async (formData) => {
    try {
      const validationData = authRegSchema.parse({
        email: formData.email,
        pass: formData.pass,
        passConfirm: formData.passConfirm,
      });

      if (!validationData) {
        throw new Error("Invalid data");
      }

      const res = await apiRequest({
        method: "post",
        url: "/auth/register",
        data: validationData,
      });

      if (!res || res.status !== 200 || !dispatch) {
        throw new Error("Registration Error");
      }

      alert("Registration successful");
      reset();
      navigate("/login");
    } catch (error) {
      const apiError = error as ApiErrorObject;

      if (apiError?.code === "VALIDATION_ERROR") {
        if (apiError.details?.email) {
          setError("email", { message: apiError.details.email[0] });
        }

        if (apiError.details?.pass) {
          setError("pass", { message: apiError.details.pass[0] });
        }

        if (apiError.details?.passConfirm) {
          setError("passConfirm", { message: apiError.details.passConfirm[0] });
        }
      } else {
        setError("root", {
          message: apiError?.message ?? "Something went wrong",
        });
      }
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};
