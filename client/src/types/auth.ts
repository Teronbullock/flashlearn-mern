export interface BaseAuthFields {
  email?: string;
  pass?: string;
}

export interface RegistrationDetails extends BaseAuthFields {
  pass_confirm?: string;
}

export interface ProfileFields extends RegistrationDetails {
  old_pass?: string;
}

export interface ForgotPasswordFields {
  email?: string;
}
export interface RemoveAccountFields {
  pass?: string;
}

export interface AuthAction<T> {
  type: "GET_PROFILE" | "ON_CHANGE" | "SUBMIT" | "RESET_FORM";
  payload?: Partial<T>;
}
