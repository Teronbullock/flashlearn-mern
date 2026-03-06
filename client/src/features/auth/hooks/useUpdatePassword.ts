import { useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePasswordSchema, type UpdatePasswordType } from "@flashlearn/schema-db";
import { type ApiErrorObject } from "@lib/api";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { authApi } from "@feats/auth/service/auth.service";

export const useUpdatePassword = () => {
  const { token } = useAuthContext();

  const controllerRef = useRef<AbortController | null>(null);
  const tokenRef = useRef<string | null>(token);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordType>({
    resolver: zodResolver(UpdatePasswordSchema),
  });

  const onSubmit: SubmitHandler<UpdatePasswordType> = async (formData) => {

    if (!tokenRef.current) {
      throw new Error("User is not authenticated, auth info missing.");
    }

    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    const signal = controller.signal;

    try {
      const res = await authApi.updatePassword(formData, tokenRef.current, signal);

      if (!res.data) {
        throw new Error("Error with card request");
      }

      reset();
      alert("Password updated successfully");
    } catch (err) {
      console.error(err);

      if (err instanceof Error && err.name === "AbortError") {
        return;
      }

      if (err && typeof err === "object") {
        const apiErr = err as ApiErrorObject;

        if (apiErr.code === "VALIDATION_ERROR") {
          setError("oldPassword", {
            message: apiErr.details?.oldPassword?.[0],
          });
          setError("password", { message: apiErr.details?.password?.[0] });
          setError("password", { message: apiErr.details?.passwordConfirm?.[0] });
          return;
        }
      }

      setError("root", { message: "Error updating password" });
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
      }
    }
  };

  return { register, handleSubmit, errors, onSubmit };
};
