import { CTASplitPage } from "./../components/CTASplitPage";
import { useReducer } from "react";
import { useAuthContext } from "@hooks/useAuthContext";
import data from "@content/loginPage.json";

export interface UserState {
  user_email: string;
  user_pass: string;
}

export interface LoginReducerAction {
  type: "SUBMIT" | "ON_CHANGE";
  payload: {
    user_email?: string;
    user_pass?: string;
  };
}

// Reducer function for the Login component
const loginReducer = (state: UserState, action: LoginReducerAction) => {
  switch (action.type) {
    case "ON_CHANGE":
      return {
        ...state,
        ...action.payload,
      };
    case "SUBMIT":
      return {
        user_email: "",
        user_pass: "",
      };
    default:
      return state;
  }
};

/**
 *  -- LoginPage --
 *
 * @returns
 */
const LoginPage = () => {
  const { login } = useAuthContext();
  const [state, dispatch] = useReducer(loginReducer, {
    user_email: "",
    user_pass: "",
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (login) {
      login(state.user_email, state.user_pass);
    } else {
      throw new Error("Login function not found");
    }
  };

  return (
    <main className="main main--login">
      <CTASplitPage
        data={data}
        state={state}
        handleFormSubmit={handleFormSubmit}
        // e={e}
        dispatch={dispatch}
      />
    </main>
  );
};

export default LoginPage;
