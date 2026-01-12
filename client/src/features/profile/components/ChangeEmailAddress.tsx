import { FormGroup, FormInput } from "@components/forms";
import type { BaseAuthFields, AuthAction } from "@app-types/auth";

type ChangeEmailAddressProps = {
  dispatch: (action: AuthAction<BaseAuthFields>) => void;
  state: BaseAuthFields;
};

export const ChangeEmailAddress = ({
  dispatch,
  state,
}: ChangeEmailAddressProps) => {
  return (
    <div className="change-email-container">
      <FormGroup labelName="New Email Address">
        <FormInput
          type="email"
          name="user_email"
          value={state.user_email || ""}
          required={true}
          onChange={(e) =>
            dispatch({
              type: "ON_CHANGE",
              payload: { user_email: e.target.value },
            })
          }
        />
      </FormGroup>
      <FormGroup labelName="Current Password">
        <FormInput
          type="password"
          name="user_pass"
          value={state.user_pass}
          placeholder="Enter your current password"
          required={true}
          onChange={(e) =>
            dispatch({
              type: "ON_CHANGE",
              payload: { user_pass: e.target.value },
            })
          }
        />
      </FormGroup>
    </div>
  );
};
