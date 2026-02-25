import { FormGroup, FormInput } from "@components/forms";
import type { RemoveAccountFields, AuthAction } from "@/types/index";

interface RemoveAccountProps {
  dispatch: (action: AuthAction<RemoveAccountFields>) => void;
  state: RemoveAccountFields;
}

export const RemoveAccount = ({ dispatch, state }: RemoveAccountProps) => {
  return (
    <div className="change-password-container">
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
          name="user_pass"
          value={state.user_pass}
          placeholder="Enter current password"
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
