import { CTASplitLayout, CTASplitForm } from "@components/CTASplit";
import { FormInput, FormGroup, FormInputError } from "@components/forms";
import { BtnLink } from "@components/btn";
import { useLogin } from "@feats/auth/hooks";
import data from "@content/loginPage.json";

const LoginPage = () => {
  const { image, title, subTitle, cta } = data;

  const { onSubmit, register, handleSubmit, errors } = useLogin();

  return (
    <main className="main main--login">
      <CTASplitLayout
        image={image}
        rightColSize="full"
        title={title}
        subTitle={subTitle}
      >
        <CTASplitForm
          onSubmit={handleSubmit(onSubmit)}
          cta={cta}
          ctaBtnSize="full"
        >
          <FormGroup labelName="Email Address" name="email">
            <FormInput
              type="email"
              id="email"
              placeholder="Enter your email"
              required={true}
              {...register("email")}
              autoFocus={true}
            />
            <FormInputError errors={errors} name="email" />
          </FormGroup>
          <FormGroup labelName="Password" className={{ group: "mb-6!" }}>
            <FormInput
              type="password"
              placeholder="Enter your password"
              required={true}
              {...register("pass")}
            />
            <FormInputError errors={errors} name="pass" />
          </FormGroup>
          {/* <div className="mb-6 flex justify-end">
            <BtnLink to="/" className="text-primary text-xs">
            Forgot Password?
            </BtnLink>
            </div> */}
        </CTASplitForm>

        <FormInputError messages={errors.root?.message} />
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
