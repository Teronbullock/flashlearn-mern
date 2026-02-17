import { useReducer, useState } from "react";
import { ZodError } from "zod";
import { apiRequest } from "@lib/api";
import type { RegistrationAction } from "@feats/auth/types";
import type { RegistrationDetails } from "@/types/index";
import { AuthRegSchema } from "@flashlearn/schema-db";

const initialRegisterState = {
  email: "",
  pass: "",
  passConfirm: "",
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

  const { email, pass, passConfirm } = state;

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    try {
      if (!email || !pass || !passConfirm) {
        throw new Error("All fields are required");
      }
      const results = AuthRegSchema.parse({
        email,
        pass,
        passConfirm,
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
