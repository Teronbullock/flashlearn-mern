import { useReducer } from "react";
import { useAuthContext } from "@hooks/useAuthContext";
import { CTASplitPage } from "@components/CTASplitPage";
import { FormInput } from "@components/Forms/FormInput";
import data from "@content/profilePage.json";

import useGetProfile from "@features/user/hooks/useGetProfile";

import apiRequest from "@/lib/api";

interface UserState {
  user_email: string;
  user_pass: string;
  user_old_pass: string;
  user_pass_confirm: string;
}

interface UserAction {
  type: "GET_PROFILE" | "ON_CHANGE" | "SUBMIT";
  payload?: {
    user_email?: string;
    user_pass?: string;
    user_old_pass?: string;
    user_pass_confirm?: string;
  };
}

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

const Profile = () => {
  const { token, userSlug } = useAuthContext();
  const [state, dispatch] = useReducer(profileReducer, {
    user_email: "",
    user_pass: "",
    user_old_pass: "",
    user_pass_confirm: "",
  });

  useGetProfile(dispatch);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // check if both strings are at least 8 characters long
      if (state.user_pass.length < 8 || state.user_pass_confirm.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      }

      // check if both strings are the same
      if (state.user_pass !== state.user_pass_confirm) {
        throw new Error("Passwords do not match");
      }

      const res = await apiRequest({
        method: "put",
        url: `/api/user/${userSlug}/profile`,
        data: {
          user_email: state.user_email,
          user_pass: state.user_pass,
          user_old_pass: state.user_old_pass,
          user_pass_confirm: state.user_pass_confirm,
        },
        config: {
          headers: { authorization: `Bearer ${token}` },
        },
      });

      if (res.status === 200 && res.data) {
        alert("Profile updated successfully");
        dispatch({ type: "SUBMIT" });
      } else {
        throw new Error("Error updating profile");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error(error);
      }
      alert(error);
    }
  };

  return (
    <main className="main main--profile-page">
      <CTASplitPage
        data={data}
        state={state}
        handleFormSubmit={handleFormSubmit}
        dispatch={dispatch}
      >
        <FormInput
          labelName="Change Email Address"
          type="email"
          name="user_email"
          value={state.user_email}
          placeholder="example@gmail.com"
          required={true}
          onChange={(e) =>
            dispatch({
              type: "ON_CHANGE",
              payload: { user_email: e.target.value },
            })
          }
        />
        <FormInput
          labelName="Enter Old Password"
          type="password"
          name="user_old_pass"
          value={state.user_old_pass}
          placeholder="Enter Old password"
          required={true}
          onChange={(e) =>
            dispatch({
              type: "ON_CHANGE",
              payload: { user_old_pass: e.target.value },
            })
          }
        />
        <FormInput
          labelName="Change Password"
          type="password"
          name="user_pass"
          value={state.user_pass}
          placeholder="Enter New password"
          required={true}
          onChange={(e) =>
            dispatch({
              type: "ON_CHANGE",
              payload: { user_pass: e.target.value },
            })
          }
        />
        <FormInput
          labelName="Confirm Password"
          type="password"
          name="user_pass_confirm"
          value={state.user_pass_confirm}
          placeholder="Enter password"
          required={true}
          onChange={(e) =>
            dispatch({
              type: "ON_CHANGE",
              payload: { user_pass_confirm: e.target.value },
            })
          }
        />
      </CTASplitPage>
    </main>
  );
};

export default Profile;
