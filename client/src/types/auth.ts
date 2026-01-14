// Base interface with the minimal fields needed
export interface BaseAuthFields {
  user_email?: string;
  user_pass?: string;
}

export interface RegistrationDetails extends BaseAuthFields {
  user_pass_confirm?: string;
}

export interface ProfileFields extends BaseAuthFields {
  user_old_pass?: string;
  user_pass_confirm?: string;
}

export interface ForgotPasswordFields {
  user_email?: string;
}

export interface RemoveAccountFields {
  user_pass?: string;
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
