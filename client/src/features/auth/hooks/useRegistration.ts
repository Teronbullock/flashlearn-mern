import { useReducer } from "react";
import { postNewUser } from "@feats/auth/service/auth-service-fix";
import {
  initialRegisterState,
  registerFormReducer,
} from "@feats/auth/reducers";

export const useRegistration = () => {
  const [state, dispatch] = useReducer(
    registerFormReducer,
    initialRegisterState,
  );

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (state.type !== "register") {
      console.error(
        "Attempted registration submission from non-register state.",
      );
      return;
    }

    try {
      if (state.user_pass.length < 8 || state.user_pass_confirm.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }
      if (state.user_pass !== state.user_pass_confirm) {
        throw new Error("Passwords do not match");
      }

      const res = await postNewUser({
        userEmail: state.user_email,
        userPass: state.user_pass,
        userPassConfirm: state.user_pass_confirm,
      });

      if (res.status !== 200) {
        throw new Error("Registration Error");
      }

      alert("Registration successful");
      dispatch({ type: "FORM_RESET" });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error: " + errorMessage);
      alert(errorMessage);
    }
  };

  return {
    submitHandler,
    state,
    dispatch,
  };
};
