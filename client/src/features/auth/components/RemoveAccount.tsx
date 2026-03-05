import { CTASplitForm } from "@components/layout/cta-split";
import { FormGroup, FormInput, FormInputError } from "@components/form";
import { useDeleteAccount } from "@feats/auth/hooks/useDeleteAccount";

export const RemoveAccount = () => {
  const { register, handleSubmit, onSubmit, errors } = useDeleteAccount();

  return (
    <CTASplitForm
      onSubmit={handleSubmit(onSubmit)}
      ctaBtnSize="md"
      cta="Remove Account"
      className="change-password-container"
    >
      <div
        className="mb-12 mt-12 rounded-lg border border-red-300 bg-red-100 p-4 text-red-800"
        role="alert"
        aria-labelledby="danger-heading"
      >
        <h4 id="danger-heading" className="flex items-center text-lg font-bold">
          WARNING!
        </h4>
        <p className="mt-2">
          If you remove your account, all data associated with your account will
          be permanently lost.
        </p>
        <p className="mt-4">
          If you are absolutely sure you want to continue, please enter your
          password.
        </p>
      </div>
      <FormGroup labelName="Enter Current Password">
        <FormInput
          type="password"
          placeholder="Enter current password"
          required={true}
          {...register("password")}
        />
        <FormInputError errors={errors} name="password" />
        <FormInputError message={errors.root?.message} />
      </FormGroup>
    </CTASplitForm>
  );
};
