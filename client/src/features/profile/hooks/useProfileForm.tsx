import { useReducer } from "react";
import { useAuthContext } from "@feats/auth/context/AuthContext";
import { useGetProfile } from "@feats/profile/hooks";
import { UserState, UserAction } from "@feats/profile/types";
import {
  updateEmail,
  updateProfile,
} from "@feats/profile/services/profile-service";

const profileReducer = (state: UserState, action: UserAction) => {
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
      return {
        ...state,
        user_pass: "",
        user_old_pass: "",
        user_pass_confirm: "",
      };
    default:
      return state;
  }
};

export const useProfileForm = () => {
  const { userSlug, token } = useAuthContext();
  const [state, dispatch] = useReducer(profileReducer, {
    user_email: "",
    user_pass: "",
    user_old_pass: "",
    user_pass_confirm: "",
  });

  useGetProfile(dispatch, userSlug);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let res;

      if (!userSlug || !state.user_email || !state.user_old_pass) {
        throw new Error(
          "Unable to update profile: authentication details are missing.",
        );
      }

      if (state.user_pass) {
        if (state.user_pass.length < 8 || state.user_pass_confirm.length < 8) {
          throw new Error("Password must be at least 8 characters long.");
        }

        if (!state.user_pass_confirm) {
          throw new Error("Confirm Password must be entered.");
        }

        if (state.user_pass !== state.user_pass_confirm) {
          throw new Error("Passwords do not match");
        }

        res = await updateProfile({
          userSlug: userSlug,
          email: state.user_email,
          newPassword: state.user_pass,
          oldPassword: state.user_old_pass,
          confirmPassword: state.user_pass_confirm,
          token: token,
        });
      } else {
        res = await updateEmail({
          userSlug: userSlug,
          email: state.user_email,
          oldPassword: state.user_old_pass,
          token: token,
        });
      }

      if (res.status !== 200 && !res.data) {
        throw new Error("Error updating profile");
      }

      alert("Profile updated successfully");
      dispatch({ type: "SUBMIT" });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error(error);
      }
      alert(error);
    }
  };

  return { state, dispatch, handleFormSubmit };
};
