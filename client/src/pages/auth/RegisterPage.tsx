import { useEffect } from "react";
import { CTASplitPage } from "@components/CTASplitPage";
import { FormInput, FormGroup } from "@components/forms";
import { BtnLink } from "@components/btn";
import data from "@content/registerPage.json";
import { useAuthPage } from "./hooks";

const Register = () => {
  const { handleRegFormSubmit, dispatch, state, setAuthType } = useAuthPage();

  useEffect(() => {
    setAuthType("register");
  }, [setAuthType]);

  if (state.type !== "register") {
    return <div>Loading Registration Form...</div>;
  }

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
        {...data}
        handleFormSubmit={handleRegFormSubmit}
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
