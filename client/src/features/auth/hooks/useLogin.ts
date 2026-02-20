import { useNavigate } from "react-router";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { authApi } from "@feats/auth/service/auth.service";
import { AUTH_CONFIG } from "@/config/auth.config";
import { authStorage } from "@feats/auth/service/auth.storage";
import { authLoginSchema, type AuthLoginType } from "@flashlearn/schema-db";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiErrorObject } from "@lib/api";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<AuthLoginType>({
    resolver: zodResolver(authLoginSchema),
  });

  const onSubmit: SubmitHandler<AuthLoginType> = async (formData) => {
    try {
      if (!formData.email || !formData.pass) {
        throw new Error("Email and password are required");
      }

      const validatedData = await authLoginSchema.parseAsync({
        email: formData.email,
        pass: formData.pass,
      });

      if (!validatedData) {
        throw new Error("Invalid data");
      }

      const { userId, token, tokenExpTime } = await authApi.login(
        validatedData.email,
        validatedData.pass,
      );

      if (!userId || !token || !tokenExpTime || !dispatch) {
        throw new Error("Invalid auth data");
      }

      dispatch({ type: "LOGIN", payload: { userId, token, tokenExpTime } });

      authStorage.set({ token });
      navigate(AUTH_CONFIG.ROUTES.DASHBOARD);
      reset();
    } catch (err) {
      const apiError = err as ApiErrorObject;

      if (apiError?.code === "VALIDATION_ERROR") {
        if (apiError.details?.email) {
          setError("email", { message: apiError.details.email[0] });
        }

        if (apiError.details?.pass) {
          setError("pass", { message: apiError.details.pass[0] });
        }
      } else {
        setError("root", {
          message: apiError?.message ?? "Something went wrong",
        });
      }
    }
  };

  return { onSubmit, register, errors, handleSubmit };
};
