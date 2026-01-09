import { CTASplitLayout, CTASplitForm } from "@components/CTASplit";
import { FormInput, FormGroup } from "@components/forms";
import { BtnLink } from "@components/btn";
import { useLogin } from "@feats/auth/hooks";
import data from "@content/loginPage.json";

const LoginPage = () => {
  const { submitHandler, dispatch, state } = useLogin();
  const { image, title, subTitle, cta } = data;

  return (
    <main className="main main--login">
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
            <BtnLink to="/" className="text-primary text-xs">
              Forgot Password?
            </BtnLink>
          </div>
        </CTASplitForm>
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
      </CTASplitLayout>
    </main>
  );
};

export default LoginPage;
