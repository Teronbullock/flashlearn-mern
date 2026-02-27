import { FormGroup, FormInput, FormInputError } from "@components/forms";
import { CTASplitForm } from "@components/CTASplit";
import { useUpdatePassword } from "@feats/auth/hooks";

export const ChangePassword = () => {
  const { onSubmit, errors, handleSubmit, register } = useUpdatePassword();

  return (
    <CTASplitForm
      onSubmit={handleSubmit(onSubmit)}
      ctaBtnSize="md"
      cta="Update Password"
      className="change-password-container"
    >
      <FormGroup labelName="Enter Old Password">
        <FormInput
          id="oldPassword"
          type="password"
          placeholder="Enter Old password"
          required={true}
          {...register("oldPassword")}
        />
        <FormInputError errors={errors} name="oldPassword" />
      </FormGroup>
      <FormGroup labelName="Change Password">
        <FormInput
          id="pass"
          className="mb-2"
          type="password"
          placeholder="Enter New password"
          {...register("password")}
        />
        <p className="mb-2 text-xs">
          Use at least 8 characters, including a number, a letter, and a symbol.
        </p>
        <FormInputError errors={errors} name="password" />
      </FormGroup>
      <FormGroup labelName="Confirm Password">
        <FormInput
          id="passwordConfirm"
          className="mb-2"
          type="password"
          placeholder="Enter password"
          {...register("passwordConfirm")}
        />
        <p className="mb-2 text-xs">Re-enter your password.</p>
        <FormInputError errors={errors} name="passwordConfirm" />
        <FormInputError message={errors.root?.message} />
      </FormGroup>
    </CTASplitForm>
  );
};
