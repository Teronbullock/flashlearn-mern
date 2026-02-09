import { CTASplitLayout, CTASplitForm } from "@components/CTASplit";
import { FormInput, FormGroup, InputError } from "@components/forms";
import { BtnLink } from "@components/btn";
import { useLogin } from "@feats/auth/hooks";
import data from "@content/loginPage.json";

const LoginPage = () => {
  const { submitHandler, dispatch, state, errors } = useLogin();
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
          <FormGroup labelName="Email Address" name="email">
            <FormInput
              type="email"
              name="email"
              value={state.email}
              placeholder="Enter your email"
              required={true}
              onChange={(e) =>
                dispatch({
                  type: "ON_CHANGE",
                  payload: {
                    email: e.target.value,
                  },
                })
              }
              autoFocus={true}
            />
            <InputError messages={errors.email} />
          </FormGroup>
          <FormGroup labelName="Password" className={{ group: "mb-6!" }}>
            <FormInput
              type="password"
              name="pass"
              value={state.pass}
              placeholder="Enter your password"
              required={true}
              onChange={(e) =>
                dispatch({
                  type: "ON_CHANGE",
                  payload: {
                    pass: e.target.value,
                  },
                })
              }
            />
            <InputError messages={errors.Pass} />
            <InputError messages={errors.general} />
          </FormGroup>
          {/* <div className="mb-6 flex justify-end">
            <BtnLink to="/" className="text-primary text-xs">
              Forgot Password?
            </BtnLink>
          </div> */}
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
