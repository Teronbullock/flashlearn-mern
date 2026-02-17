import { useRef } from "react";
import { useNavigate } from "react-router";
import { apiRequest } from "@lib/api/api-request";
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

  const tokenRef = useRef(token);
  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CardFormType>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      term: "",
      definition: "",
    },
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

    try {
      const res = await apiRequest({
        method: "post",
        url: `/sets/${setId}/cards`,
        data: {
          term: data.term,
          definition: data.definition,
        },
        token: tokenRef.current,
      });

      if (!res.data) {
        throw new Error("Error creating card");
      }

      alert(res.data.msg);
      reset({ term: "", definition: "" });
    } catch (err) {
      if (err.validationErr) {
        setError("term", { message: err.validationErr.term?.[0] });
        setError("definition", { message: err.validationErr.definition?.[0] });
      }

      setError("root", { message: "Error creating card" });
    }
  };

  return { onSubmit, errors, register, handleSubmit, isSubmitting };
};
