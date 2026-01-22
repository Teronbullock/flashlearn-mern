import { useReducer, useState } from "react";
import { ZodError } from "zod";
import { apiRequest } from "@lib/api";
import type { RegistrationAction } from "@feats/auth/types";
import type { RegistrationDetails } from "@/types/index";
import { AuthRegSchema } from "@common";

const initialRegisterState = {
  user_email: "",
  user_pass: "",
  user_pass_confirm: "",
};

const registerFormReducer = (
  state: RegistrationDetails,
  action: RegistrationAction,
) => {
  switch (action.type) {
    case "ON_CHANGE":
      return {
        ...state,
        ...action.payload,
      };
    case "FORM_RESET":
      return initialRegisterState;
    default:
      return state;
  }
};

export const useRegistration = () => {
  const [state, dispatch] = useReducer(
    registerFormReducer,
    initialRegisterState,
  );

  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const {
    user_email: userEmail,
    user_pass: userPass,
    user_pass_confirm: userPassConfirm,
  } = state;

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    try {
      if (!userEmail || !userPass || !userPassConfirm) {
        throw new Error("All fields are required");
      }
      const results = AuthRegSchema.parse({
        userEmail,
        userPass,
        userPassConfirm,
      });

      const res = await apiRequest({
        method: "post",
        url: "/auth/register",
        data: results,
      });

      if (!res || res.status !== 200) {
        throw new Error("Registration Error");
      }

      alert("Registration successful");
      dispatch({ type: "FORM_RESET" });
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string[]> = {};
        error.issues.forEach((issue) => {
          const path = issue.path[0] as string;
          if (!fieldErrors[path]) {
            fieldErrors[path] = [];
          }
          fieldErrors[path].push(issue.message);
        });
        setErrors(fieldErrors);
      } else {
        const msg =
          error instanceof Error ? error.message : "Registration Error";
        alert(msg);
      }
    }
  };

  return {
    submitHandler,
    state,
    dispatch,
    errors,
  };
};
