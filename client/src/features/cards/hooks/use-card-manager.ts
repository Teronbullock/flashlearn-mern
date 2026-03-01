import { useEffect, useRef, useCallback, useMemo } from "react";
import { apiRequest, type ApiErrorObject } from "@lib/api/api-request";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import {
  CardFormSchema,
  type CardFormType,
  type CardSelectType,
} from "@flashlearn/schema-db";

interface CardManagerParams {
  setId?: string;
  cardId?: string;
  getAllSetCards?: () => void;
  card?: CardSelectType | null;
}

interface CardRequestConfig {
  method: "post" | "put";
  url: string;
  mode: "add" | "edit";
}

export const useCardManager = ({
  setId,
  cardId,
  getAllSetCards,
  card,
}: CardManagerParams) => {
  const { token } = useAuthContext();
  const controllerRef = useRef<AbortController | null>(null);
  const tokenRef = useRef(token);
  const navigate = useNavigate();

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CardFormType>({
    resolver: zodResolver(CardFormSchema),
    defaultValues: {
      term: "",
      definition: "",
    },
  });

  const requestConfig: CardRequestConfig = useMemo(() => {
    const isEdit = !!cardId;

    return {
      method: isEdit ? "put" : "post",
      url: isEdit ? `/sets/${setId}/cards/${cardId}` : `/sets/${setId}/cards`,
      mode: isEdit ? "edit" : "add",
    };
  }, [setId, cardId]);

  const onSubmit: SubmitHandler<CardFormType> = async (data) => {
    if (!tokenRef.current) {
      throw new Error("User is not authenticated, auth info missing.");
    }

    if (!setId) {
      setError("root", { message: "Set data missing" });
      return;
    }
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    const signal = controller.signal;

    try {
      const res = await apiRequest({
        method: requestConfig.method,
        url: requestConfig.url,
        data: {
          term: data.term,
          definition: data.definition,
        },
        token: tokenRef.current,
        signal: signal,
      });

      if (!res.data) {
        throw new Error("Error with card request");
      }

      if (requestConfig.mode === "edit") {
        navigate(`/set/${setId}`);
      } else {
        reset();
      }
    } catch (err) {
      console.error(err);

      if (err instanceof Error && err.name === "AbortError") {
        return;
      }

      if (err && typeof err === "object") {
        const apiErr = err as ApiErrorObject;

        if (apiErr.code === "VALIDATION_ERROR") {
          setError("term", { message: apiErr.details?.term?.[0] });
          setError("definition", { message: apiErr.details?.definition?.[0] });
          return;
        }
      }

      setError("root", { message: "Error creating card" });
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
      }
    }
  };

  const deleteHandler = useCallback(
    async (cardId: string): Promise<void> => {
      if (!tokenRef.current) {
        throw new Error("auth info missing, user not authenticated");
      }

      if (!setId || !cardId || !getAllSetCards) {
        throw new Error("Error: deleting card, data missing");
      }

      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;
      const signal = controller.signal;

      try {
        const res = await apiRequest({
          method: "delete",
          url: `/sets/${setId}/cards/${cardId}`,
          token: tokenRef.current,
          signal: signal,
        });

        if (!res.data) {
          throw new Error("Error: card not deleted");
        }

        alert(res.data.msg);
        getAllSetCards();
      } catch (err) {
        console.error(err);
        alert("Error: card not deleted");
      } finally {
        if (controllerRef.current === controller) {
          controllerRef.current = null;
        }
      }
    },
    [setId, getAllSetCards],
  );

  useEffect(() => {
    if (requestConfig.mode !== "edit") return;

    reset({
      term: card?.term,
      definition: card?.definition,
    });
  }, [requestConfig.mode, card, reset]);

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  return {
    onSubmit,
    errors,
    register,
    handleSubmit,
    isSubmitting,
    deleteHandler,
  };
};
