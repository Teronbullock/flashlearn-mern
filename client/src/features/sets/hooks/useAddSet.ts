import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SetSchema, setSchema } from "@flashlearn/schema-db";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { apiRequest } from "@/lib/api/api-request";

export const useAddSet = () => {
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const tokenRef = useRef<string | null>(token);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetSchema>({
    resolver: zodResolver(setSchema),
  });

  const onSubmit: SubmitHandler<SetSchema> = async (formData) => {
    if (!tokenRef.current) {
      throw new Error("User is not authenticated. Session missing.");
    }
    console.log(formData, "form");
    try {
      const res = await apiRequest({
        method: "post",
        url: `/sets/`,
        data: {
          title: formData.title,
          description: formData.description,
        },
        token: tokenRef.current,
      });

      if (res.data) {
        // dispatch({ type: "SUBMIT" });
        navigate(`/dashboard`);
      }
    } catch (error) {
      console.error(error);
      alert("Error creating set");
    }
  };

  return { register, onSubmit, handleSubmit, errors };
};
