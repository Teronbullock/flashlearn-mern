import { FormGroup, FormInput } from "@components/forms";

type ChangePasswordProps = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  onOldPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
};

export const ChangePassword = ({
  oldPassword,
  newPassword,
  confirmPassword,
  onOldPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
}: ChangePasswordProps) => {
  return (
    <div className="change-password-container">
      <FormGroup labelName="Enter Old Password">
        <FormInput
          type="password"
          name="user_old_pass"
          value={oldPassword}
          placeholder="Enter Old password"
          required={true}
          onChange={(e) => onOldPasswordChange(e.target.value)}
        />
      </FormGroup>
      <FormGroup labelName="Change Password">
        <FormInput
          className="mb-2"
          type="password"
          name="user_pass"
          value={newPassword}
          placeholder="Enter New password"
          onChange={(e) => onNewPasswordChange(e.target.value)}
        />
        <p className="mb-5 text-xs">
          Use at least 8 characters, including a number, a letter, and a
          symbol.
        </p>
      </FormGroup>
      <FormGroup labelName="Confirm Password">
        <FormInput
          className="mb-2"
          type="password"
          name="user_pass_confirm"
          value={confirmPassword}
          placeholder="Enter password"
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
        />
        <p className="mb-30 text-xs">Re-enter your password.</p>
      </FormGroup>
    </div>
  );
};
