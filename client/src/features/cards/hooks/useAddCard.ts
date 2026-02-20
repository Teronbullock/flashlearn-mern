import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { apiRequest, type ApiErrorObject } from "@lib/api/api-request";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cardFormSchema, type CardFormType } from "@flashlearn/schema-db";

interface UseAddCardParams {
  setId?: string;
}

export const useAddCard = ({ setId }: UseAddCardParams) => {
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const setControllerRef = useRef<AbortController | null>(null);

  const tokenRef = useRef(token);
  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CardFormType>({
    resolver: zodResolver(cardFormSchema),
  });

  // add card handler
  const onSubmit: SubmitHandler<CardFormType> = async (data) => {
    if (!tokenRef.current) {
      throw new Error("User is not authenticated, auth info missing.");
    }

    if (!setId) {
      setError("root", { message: "Set data missing" });
      return;
    }
    if (setControllerRef.current) {
      setControllerRef.current.abort();
    }

    const controller = new AbortController();
    setControllerRef.current = controller;
    const signal = controller.signal;

    try {
      const res = await apiRequest({
        method: "post",
        url: `/sets/${setId}/cards`,
        data: {
          term: data.term,
          definition: data.definition,
        },
        token: tokenRef.current,
        signal: signal,
      });

      if (!res.data) {
        throw new Error("Error creating card");
      }

      navigate(`/set/${setId}`);
    } catch (err) {
      if (err && typeof err === "object") {
        const apiErr = err as ApiErrorObject;

        if (apiErr.code === "VALIDATION_ERROR") {
          setError("term", { message: apiErr.details?.term?.[0] });
          setError("definition", { message: apiErr.details?.definition?.[0] });
        } else {
          setError("root", { message: "Error creating card" });
        }
      }

      if (err instanceof Error && err) {
        if (err.name === "AbortError") {
          return;
        } else {
          setError("root", { message: "Error creating card" });
        }
      }

      setError("root", { message: "Error creating card" });
    } finally {
      if (setControllerRef.current === controller) {
        setControllerRef.current = null;
      }
    }
  };

  useEffect(() => {
    return () => {
      if (setControllerRef.current) {
        setControllerRef.current.abort();
      }
    };
  }, []);

  return { onSubmit, errors, register, handleSubmit, isSubmitting };
};
