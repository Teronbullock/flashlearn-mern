import { CTASplitLayout, CTASplitForm } from "@components/CTASplit";
import { FormInput, FormGroup, InputError } from "@components/forms";
import { BtnLink } from "@components/btn";
import data from "@content/registerPage.json";
import { useRegistration } from "@feats/auth/hooks";

const RegisterPage = () => {
  const { submitHandler, dispatch, state, errors } = useRegistration();
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
              name="email"
              value={state.email}
              placeholder="Enter your email"
              required={true}
              onChange={(e) =>
                dispatch({
                  type: "ON_CHANGE",
                  payload: { email: e.target.value },
                })
              }
            />
            <InputError messages={errors.userEmail} />
          </FormGroup>
          <FormGroup labelName="Choose Password">
            <FormInput
              type="password"
              name="pass"
              value={state.pass}
              placeholder="Enter your password"
              required={true}
              onChange={(e) =>
                dispatch({
                  type: "ON_CHANGE",
                  payload: { pass: e.target.value },
                })
              }
            />
            <p className="mb-2 mt-2 text-xs">
              Password should consist of numbers and special characters
            </p>
            <InputError messages={errors.userPass} />
          </FormGroup>
          <FormGroup labelName="Confirm Password">
            <FormInput
              type="password"
              name="confirm_pass"
              value={state.pass_confirm}
              placeholder="Confirm your password"
              required={true}
              onChange={(e) =>
                dispatch({
                  type: "ON_CHANGE",
                  payload: { pass_confirm: e.target.value },
                })
              }
            />
            <p className="mb-2 mt-2 text-xs">Re-enter your password</p>
            <InputError messages={errors.userPassConfirm} />
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
