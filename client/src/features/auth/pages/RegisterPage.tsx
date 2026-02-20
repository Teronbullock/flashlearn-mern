import { CTASplitLayout, CTASplitForm } from "@components/CTASplit";
import { FormInput, FormGroup, FormInputError } from "@components/forms";
import { BtnLink } from "@components/btn";
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
              {...register("pass")}
            />
            <p className="mb-2 mt-2 text-xs">
              Password should consist of numbers and special characters
            </p>
            <FormInputError errors={errors} name="pass" />
          </FormGroup>
          <FormGroup labelName="Confirm Password">
            <FormInput
              type="password"
              placeholder="Confirm your password"
              required={true}
              {...register("passConfirm")}
            />
            <p className="mb-2 mt-2 text-xs">Re-enter your password</p>
            <FormInputError errors={errors} name="passConfirm" />
            <FormInputError messages={errors.root?.message} />
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
