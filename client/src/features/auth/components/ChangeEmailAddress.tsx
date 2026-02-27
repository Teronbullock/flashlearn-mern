import { FormGroup, FormInput, FormInputError } from "@components/forms";
import { CTASplitForm } from "@components/CTASplit";
import { useUpdateEmail } from "../hooks";

export const ChangeEmailAddress = () => {
  const { onSubmit, errors, handleSubmit, register } = useUpdateEmail();

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
            {...register("password")}
          />
          <FormInputError errors={errors} name="password" />
        </FormGroup>
      </div>
    </CTASplitForm>
  );
};
