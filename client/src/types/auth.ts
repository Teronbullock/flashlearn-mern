// Base interface with the minimal fields needed
export interface BaseAuthFields {
  user_email?: string;
  user_pass?: string;
}

export interface RegistrationDetails extends BaseAuthFields {
  user_pass_confirm?: string;
}

export interface ChangeEmailFields extends Pick<BaseAuthFields, "user_email"> {
  user_old_pass?: string;
}

export interface ChangePasswordFields extends Pick<
  BaseAuthFields,
  "user_pass"
> {
  user_old_pass?: string;
  user_pass_confirm?: string;
}

export interface ForgotPasswordFields {
  user_email?: string;
}

// Generic action type for auth reducers
export interface AuthAction<F> {
  type: string;
  payload?: Partial<F>;
}

export interface UserAction {
  type: "GET_PROFILE" | "ON_CHANGE" | "SUBMIT" | "RESET_FORM";
  payload?: {
    user_email?: string;
    user_pass?: string;
    user_old_pass?: string;
    user_pass_confirm?: string;
  };
}
