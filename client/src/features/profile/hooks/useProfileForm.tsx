import { useReducer } from "react";
import { Navigate } from "react-router-dom";
import type { ProfileFields, AuthAction } from "@app-types/auth";
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

  const handleEmailUpdateSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      if (!token) {
        throw new Error("user authentication is required");
      }

      const res = await apiRequest({
        method: "put",
        url: `/profile/update-email`,
        data: {
          user_email: state.user_email,
          user_pass: state.user_pass,
        },
        token: token,
      });

      if (res.status !== 200 && !res.data) {
        throw new Error("Error updating email");
      }

      // alert("Email updated successfully");
      dispatch({ type: "RESET_EMAIL_FORM" });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        alert(error.message);
      } else {
        console.error(error);
        alert("An unknown error occurred");
      }
    }
  };

  const handlePasswordUpdateSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!token) {
      throw new Error("user authentication is required");
    }

    try {
      const res = await apiRequest({
        method: "put",
        url: `/profile/update-password`,
        data: {
          user_old_pass: state.user_old_pass,
          user_pass: state.user_pass,
          user_pass_confirm: state.user_pass_confirm,
        },
        token: token,
      });

      if (res.status !== 200 && !res.data) {
        throw new Error("Error updating password");
      }

      alert("Password updated successfully");
      dispatch({
        type: "RESET_PASSWORD_FORM",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        alert(error.message);
      } else {
        console.error(error);
        alert("An unknown error occurred");
      }
    }
  };

  const handleRemoveAccountSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!token) {
      throw new Error("user authentication is required");
    }

    try {
      const res = await apiRequest({
        method: "put",
        url: `/profile/delete-account`,
        data: {
          user_pass: state.user_pass,
        },
        token: token,
      });

      if (res.status !== 200 && !res.data) {
        throw new Error("Error updating password");
      }

      alert("Account Deleted");
      dispatch({
        type: "RESET_FORM",
      });

      <Navigate to={"/"} replace />;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
        alert(error.message);
      } else {
        console.error(error);
        alert("An unknown error occurred");
      }
    }
  };

  return {
    state,
    dispatch,
    handleEmailUpdateSubmit,
    handlePasswordUpdateSubmit,
    handleRemoveAccountSubmit,
  };
};
