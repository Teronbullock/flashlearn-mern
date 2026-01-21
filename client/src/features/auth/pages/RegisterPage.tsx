import { CTASplitLayout, CTASplitForm } from "@components/CTASplit";
import { FormInput, FormGroup, InputError } from "@components/forms";
import { BtnLink } from "@components/btn";
import data from "@content/registerPage.json";
import { useRegistration } from "@feats/auth/hooks";

const RegisterPage = () => {
  const { submitHandler, dispatch, state } = useRegistration();
  const { image, title, subTitle, cta } = data;

  return (
    <main className="main main--register">
      <CTASplitLayout
        image={image}
        rightColSize="full"
        title={title}
        subTitle={subTitle}
      >
        <CTASplitForm
          handleFormSubmit={submitHandler}
          cta={cta}
          ctaBtnSize="full"
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
              <InputError messages={formErrors.userEmail} />
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
            <InputError messages={formErrors.userPassword} />
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
              <InputError messages={formErrors.userPassConfirm} />
            />
            <p className="mb-8 text-xs">Re-enter your password</p>
          </FormGroup>
        </CTASplitForm>
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
      </CTASplitLayout>
    </main>
  );
};

export default RegisterPage;
