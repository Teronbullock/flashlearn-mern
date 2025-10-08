import { useReducer } from "react";
import { useAuthContext } from "@hooks/useAuthContext";
import { CTASplitPage } from "@components/CTASplitPage";
import { FormInput, FormGroup } from "@components/forms";
import { BtnLink } from "@components/btn";
import data from "@content/registerPage.json";

import apiRequest from "@/lib/api";

interface UserState {
  user_email: string;
  user_pass: string;
  user_pass_confirm: string;
}

interface RegisterReducerAction {
  type: "ON_CHANGE" | "SUBMIT";
  payload?: {
    user_email?: string;
    user_pass?: string;
    user_pass_confirm?: string;
  };
}

// Reducer function for the Register component
const registerReducer = (state: UserState, action: RegisterReducerAction) => {
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
        user_pass_confirm: "",
      };
    default:
      return state;
  }
};

/**
 *  -- Register --
 *
 * @returns
 */
const Register = () => {
  const { login } = useAuthContext();
  const [state, dispatch] = useReducer(registerReducer, {
    user_email: "",
    user_pass: "",
    user_pass_confirm: "",
  });

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

      // sending the request to register the user
      const res = await apiRequest({
        method: "post",
        url: "/api/user/register",
        data: state,
      });

      // if the response is successful, alert the user and log them in
      if (res.status === 200 && login) {
        alert("Registration successful");
        login(state.user_email, state.user_pass);
        dispatch({ type: "SUBMIT" });
      } else {
        throw new Error("Registration Error");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error: " + error.message);
      } else {
        console.error(error);
      }
      alert(error);
    }
  };

  const authContent = (
    <div>
      <div className="mb-15 relative flex items-center justify-center">
        <div className="border-secondary absolute w-full border px-5"></div>
        <p className="z-10 bg-white px-3 text-center">Or</p>
      </div>
      <p className="text-center">
        Are you an Existing User?{" "}
        <BtnLink to="/login" className="text-red-500">
          Login here
        </BtnLink>
      </p>
    </div>
  );

  return (
    <main className="main main--register">
      <CTASplitPage
        data={data}
        state={state}
        handleFormSubmit={handleFormSubmit}
        dispatch={dispatch}
        bottomOfFormSlot={authContent}
      >
        <FormGroup labelName="Enter Email Address">
          <FormInput
            type="email"
            name="user_email"
            value={state.user_email}
            placeholder="Enter your email"
            required={true}
            onChange={(e) =>
              dispatch({
                type: "ON_CHANGE",
                payload: { user_email: e.target.value },
              })
            }
          />
        </FormGroup>
        <FormGroup labelName="Choose Password">
          <FormInput
            type="password"
            name="user_pass"
            value={state.user_pass}
            placeholder="Enter your password"
            required={true}
            onChange={(e) =>
              dispatch({
                type: "ON_CHANGE",
                payload: { user_pass: e.target.value },
              })
            }
          />
          <p className="mb-5 text-xs">
            Password should consist of numbers and special characters
          </p>
        </FormGroup>
        <FormGroup labelName="Confirm Password">
          <FormInput
            type="password"
            name="user_confirm_pass"
            value={state.user_pass_confirm}
            placeholder="Confirm your password"
            required={true}
            onChange={(e) =>
              dispatch({
                type: "ON_CHANGE",
                payload: { user_pass_confirm: e.target.value },
              })
            }
          />
          <p className="mb-8 text-xs">Re-enter your password</p>
        </FormGroup>
      </CTASplitPage>
    </main>
  );
};

export default Register;
