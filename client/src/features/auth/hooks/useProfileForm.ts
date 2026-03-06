import { useReducer } from "react";
import { Navigate } from "react-router-dom";
import type { ProfileFields, AuthAction } from "@/types/index";
import { apiRequest } from "@lib/api";

interface ProfileFormProps {
  token: string | null;
}

const initialProfileState = {
  user_email: "",
  user_old_pass: "",
  user_pass: "",
  user_pass_confirm: "",
};

const profileReducer = (
  state: ProfileFields,
  action: AuthAction<ProfileFields>,
) => {
  switch (action.type) {
    case "GET_PROFILE":
      return {
        ...state,
        ...action.payload,
      };
    case "ON_CHANGE":
      return {
        ...state,
        ...action.payload,
      };
    case "SUBMIT":
    case "RESET_EMAIL_FORM":
      return {
        ...state,
        user_pass: "",
        user_pass_confirm: "",
      };
    case "RESET_PASSWORD_FORM":
      return initialProfileState;
    default:
      return state;
  }
};

export const useProfileForm = ({ token }: ProfileFormProps) => {
  const [state, dispatch] = useReducer(profileReducer, initialProfileState);

  return {
    state,
    dispatch,
  };
};
