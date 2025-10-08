import { useReducer } from "react";
import { useAuthContext } from "@hooks/useAuthContext";
import { CTASplitPage } from "../../components/CTASplitPage";
import { FormInput, FormGroup } from "@components/forms";
import data from "@content/loginPage.json";
import { BtnLink } from "@components/btn";

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

  const authContent = (
    <div>
      <div className="mb-15 relative flex items-center justify-center">
        <div className="border-secondary absolute w-full border px-5"></div>
        <p className="z-10 bg-white px-3 text-center">Or</p>
      </div>
      <p className="text-center">
        Are you a new User?{" "}
        <BtnLink to="/register" className="text-red-500">
          Create an Account
        </BtnLink>
      </p>
    </div>
  );

  return (
    <main className="main main--login">
      <CTASplitPage
        data={data}
        state={state}
        handleFormSubmit={handleFormSubmit}
        dispatch={dispatch}
        bottomOfFormSlot={authContent}
      >
        <FormGroup labelName="Email Address" name="user_email">
          <FormInput
            type="email"
            name="user_email"
            value={state.user_email}
            placeholder="Enter your email"
            required={true}
            onChange={(e) =>
              dispatch({
                type: "ON_CHANGE",
                payload: {
                  user_email: e.target.value,
                },
              })
            }
            autoFocus={true}
          />
        </FormGroup>
        <FormGroup labelName="Password" className={{ group: "!mb-2" }}>
          <FormInput
            type="password"
            name="user_pass"
            value={state.user_pass}
            placeholder="Enter your password"
            required={true}
            onChange={(e) =>
              dispatch({
                type: "ON_CHANGE",
                payload: {
                  user_pass: e.target.value,
                },
              })
            }
          />
        </FormGroup>
        <div className="mb-6 flex justify-end">
          <BtnLink
            to="/"
            className="text-xs"
            variants={{ style: "btn", color: "primary" }}
          >
            Forgot Password?
          </BtnLink>
        </div>
      </CTASplitPage>
    </main>
  );
};

export default LoginPage;
