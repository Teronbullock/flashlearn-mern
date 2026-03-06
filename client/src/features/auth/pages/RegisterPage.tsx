import { CTASplitLayout, CTASplitForm } from "@components/layout/cta-split";
import { FormInput, FormGroup, FormInputError } from "@components/form";
import { ButtonLink } from "@components/ui/button";
import data from "@content/registerPage.json";
import { useRegistration } from "@feats/auth/hooks";

const RegisterPage = () => {
  const { register, onSubmit, errors, handleSubmit } = useRegistration();
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
          onSubmit={handleSubmit(onSubmit)}
          cta={cta}
          ctaBtnSize="full"
        >
          <FormGroup labelName="Enter Email Address">
            <FormInput
              type="email"
              placeholder="Enter your email"
              required={true}
              {...register("email")}
            />
            <FormInputError errors={errors} name="email" />
          </FormGroup>
          <FormGroup labelName="Choose Password">
            <FormInput
              type="password"
              placeholder="Enter your password"
              required={true}
              {...register("password")}
            />
            <p className="mb-2 mt-2 text-xs">
              Password should consist of numbers and special characters
            </p>
            <FormInputError errors={errors} name="password" />
          </FormGroup>
          <FormGroup labelName="Confirm Password">
            <FormInput
              type="password"
              placeholder="Confirm your password"
              required={true}
              {...register("passwordConfirm")}
            />
            <p className="mb-2 mt-2 text-xs">Re-enter your password</p>
            <FormInputError errors={errors} name="passwordConfirm" />
            <FormInputError message={errors.root?.message} />
          </FormGroup>
        </CTASplitForm>
        <div>
          <div className="mb-15 relative flex items-center justify-center">
            <div className="border-secondary absolute w-full border px-5"></div>
            <p className="z-10 bg-white px-3 text-center">Or</p>
          </div>
          <p className="text-center">
            Are you an Existing User?{" "}
            <ButtonLink to="/login" className="text-red-500">
              Login here
            </ButtonLink>
          </p>
        </div>
      </CTASplitLayout>
    </main>
  );
};

export default RegisterPage;
