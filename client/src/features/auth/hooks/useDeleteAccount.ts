import { useRef, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordSchema, type PasswordType } from "@flashlearn/schema-db";
import { type ApiErrorObject } from "@lib/api";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { useNavigate } from "react-router";
import { authStorage } from "@feats/auth/service/auth.storage";
import { authApi } from "@feats/auth/service/auth.service";

export const useDeleteAccount = () => {
  const { token, dispatch } = useAuthContext();

  const controllerRef = useRef<AbortController | null>(null);
  const tokenRef = useRef<string | null>(token);

  const navigate = useNavigate();

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<PasswordType>({
    resolver: zodResolver(PasswordSchema),
  });

  const onSubmit: SubmitHandler<PasswordType> = async (formData) => {
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
      const res = await authApi.deleteAccount(formData, tokenRef.current, signal);


      if (!res.data || !dispatch) {
        throw new Error("Error with card request");
      }

      reset();
      alert("Account deleted successfully");
      authStorage.remove();

      dispatch({ type: "LOGOUT" });

      navigate("/");


    } catch (err) {
      console.error(err);

      if (err instanceof Error && err.name === "AbortError") {
        return;
      }

      if (err && typeof err === "object") {
        const apiErr = err as ApiErrorObject;

        if (apiErr.code === "VALIDATION_ERROR") {
          setError("password", { message: apiErr.details?.pass?.[0] });
          return;
        }
      }

      setError("root", { message: "Error deleting account" });
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
      }
    }
  };

  return { register, handleSubmit, errors, onSubmit };
};
