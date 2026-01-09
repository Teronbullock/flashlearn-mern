import { FormGroup, FormInput } from "@components/forms";

type ChangeEmailAddressProps = {
  email: string;
  onEmailChange: (value: string) => void;
};

export const ChangeEmailAddress = ({
  email,
  onEmailChange,
}: ChangeEmailAddressProps) => {
  return (
    <div className="change-email-container">
      <FormGroup labelName="Change Email Address">
        <FormInput
          type="email"
          name="user_email"
          value={email}
          placeholder="example@gmail.com"
          required={true}
          onChange={(e) => onEmailChange(e.target.value)}
        />
      </FormGroup>
      <FormGroup labelName="Change Email Address">
        <FormInput
          type="email"
          name="user_email"
          value={email}
          placeholder="example@gmail.com"
          required={true}
          onChange={(e) => onEmailChange(e.target.value)}
        />
      </FormGroup>
    </div>
  );
};
