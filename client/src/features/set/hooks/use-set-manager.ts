import { useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SetType, SetSchema } from "@flashlearn/schema-db";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { apiRequest, type ApiErrorObject } from "@/lib/api/api-request";


interface SetManagerParams {
  set?: SetType | null;
  setId?: string;
}

interface SetRequestConfig {
  method: "post" | "put";
  url: string;
  mode: "add" | "edit";
}

export const useSetManager = ({ set, setId }: SetManagerParams) => {
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const setControllerRef = useRef<AbortController | null>(null);
  const tokenRef = useRef<string | null>(token);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<SetType>({
    resolver: zodResolver(SetSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const requestConfig: SetRequestConfig = useMemo(() => {
    const isEdit = !!setId;

    return {
      method: isEdit ? "put" : "post",
      url: isEdit ? `/sets/${setId}` : `/sets/`,
      mode: isEdit ? "edit" : "add",
    };
  }, [setId]);

  const onSubmit: SubmitHandler<SetType> = async (formData) => {
    if (!tokenRef.current) {
      throw new Error("User is not authenticated. Session missing.");
    }

    if (requestConfig.mode === "edit" && !setId) {
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
        method: requestConfig.method,
        url: requestConfig.url,
        data: {
          title: formData.title,
          description: formData.description,
        },
        token: tokenRef.current,
        signal: signal,
      });

      if (!res.data) {
        throw new Error("Error with set request");
      }

      navigate(`/dashboard`);
      reset();
    } catch (err) {
      if (err && typeof err === "object") {
        const apiErr = err as ApiErrorObject;

        if (apiErr.code === "VALIDATION_ERROR") {
          setError("title", { message: apiErr.details?.term?.[0] });
          setError("description", { message: apiErr.details?.definition?.[0] });
          return;

        } if ("message" in err) {
          setError("root", { message: err.message as string });
          console.log('set');
          return;

        } else {
          setError("root", { message: "Error creating card" });
          return;

        }
      }

      if (err instanceof Error && err) {
        if (err.name === "AbortError") {
          return;

        } else {
          setError("root", { message: "Error creating card" });
          return;

        }
      }

      setError("root", { message: "Error creating cards" });
    } finally {
      if (setControllerRef.current === controller) {
        setControllerRef.current = null;
      }
    }
  };

  useEffect(() => {
    if (requestConfig.mode !== "edit") return;
    if (!set && !setId) return;
    reset({ ...set });
  }, [requestConfig.mode, set, setId, reset]);

  useEffect(() => {
    return () => {
      if (setControllerRef.current) {
        setControllerRef.current.abort();
      }
    };
  }, []);

  return { register, onSubmit, handleSubmit, errors };
};
