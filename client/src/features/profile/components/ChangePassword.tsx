import { FormGroup, FormInput } from "@components/forms";
import type { ChangePasswordFields, AuthAction } from "@app-types/auth";

type ChangePasswordProps = {
  dispatch: (action: AuthAction<ChangePasswordFields>) => void;
  state: ChangePasswordFields;
};

export const ChangePassword = ({ dispatch, state }: ChangePasswordProps) => {
  return (
    <div className="change-password-container">
      <FormGroup labelName="Enter Old Password">
        <FormInput
          type="password"
          name="user_old_pass"
          value={state.user_old_pass}
          placeholder="Enter Old password"
          required={true}
          onChange={(e) =>
            dispatch({
              type: "ON_CHANGE",
              payload: { user_old_pass: e.target.value },
            })
          }
        />
      </FormGroup>
      <FormGroup labelName="Change Password">
        <FormInput
          className="mb-2"
          type="password"
          name="user_pass"
          value={state.user_pass}
          placeholder="Enter New password"
          onChange={(e) =>
            dispatch({
              type: "ON_CHANGE",
              payload: { user_pass: e.target.value },
            })
          }
        />
        <p className="mb-5 text-xs">
          Use at least 8 characters, including a number, a letter, and a symbol.
        </p>
      </FormGroup>
      <FormGroup labelName="Confirm Password">
        <FormInput
          className="mb-2"
          type="password"
          name="user_pass_confirm"
          value={state.user_pass_confirm}
          placeholder="Enter password"
          onChange={(e) =>
            dispatch({
              type: "ON_CHANGE",
              payload: { user_pass_confirm: e.target.value },
            })
          }
        />
        <p className="mb-30 text-xs">Re-enter your password.</p>
      </FormGroup>
    </div>
  );
};
