export interface BaseAuthFields {
  user_email?: string;
  user_pass?: string;
}

export interface RegistrationDetails extends BaseAuthFields {
  user_pass_confirm?: string;
}

export interface ProfileFields extends RegistrationDetails {
  user_old_pass?: string;
}

export interface ForgotPasswordFields {
  user_email?: string;
}
export interface RemoveAccountFields {
  user_pass?: string;
}

export interface AuthAction<T> {
  type: "GET_PROFILE" | "ON_CHANGE" | "SUBMIT" | "RESET_FORM";
  payload?: Partial<T>;
}
