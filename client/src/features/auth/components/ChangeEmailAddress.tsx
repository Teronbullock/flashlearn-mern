import { FormGroup, FormInput, FormInputError } from "@components/forms";
import { CTASplitForm } from "@components/CTASplit";
import { useManageEmail } from "../hooks";

export const ChangeEmailAddress = () => {
  const { onSubmit, errors, handleSubmit, register } = useManageEmail();

  return (
    <CTASplitForm
      onSubmit={handleSubmit(onSubmit)}
      ctaBtnSize="md"
      cta="Update Email"
    >
      <div className="change-email-container">
        <FormGroup labelName="New Email Address">
          <FormInput
            type="email"
            placeholder="Enter your new email"
            required={true}
            {...register("email")}
          />
          <FormInputError errors={errors} name="email" />
        </FormGroup>
        <FormGroup labelName="Current Password">
          <FormInput
            type="password"
            placeholder="Enter your current password"
            required={true}
            {...register("pass")}
          />
          <FormInputError errors={errors} name="pass" />
        </FormGroup>
      </div>
    </CTASplitForm>
  );
};
