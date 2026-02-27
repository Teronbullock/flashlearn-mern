import { useNavigate } from "react-router";
import { type ApiErrorObject } from "@lib/api";
import { RegisterSchema, type RegisterType } from "@flashlearn/schema-db";
import { AUTH_CONFIG } from "@/config/auth.config";
import { authStorage } from "@feats/auth/service/auth.storage";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { authApi } from "@feats/auth/service/auth.service";

export const useRegistration = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterType> = async (formData) => {
    try {
      const validationData = RegisterSchema.parse({
        email: formData.email,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
      });

      if (!validationData) {
        throw new Error("Invalid data");
      }

      const { userId, token, tokenExpTime } = await authApi.register(validationData);

      if (!userId || !token || !tokenExpTime || !dispatch) {
        throw new Error("Registration Error");
      }

      dispatch({ type: "LOGIN", payload: { userId, token, tokenExpTime } });

      authStorage.set({ token });

      reset();
      navigate(AUTH_CONFIG.ROUTES.DASHBOARD);
    } catch (error) {
      const apiError = error as ApiErrorObject;

      if (apiError?.code === "VALIDATION_ERROR") {
        if (apiError.details?.email) {
          setError("email", { message: apiError.details.email[0] });
        }

        if (apiError.details?.pass) {
          setError("password", { message: apiError.details.pass[0] });
        }

        if (apiError.details?.passwordConfirm) {
          setError("passwordConfirm", {
            message: apiError.details.passwordConfirm[0],
          });
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
