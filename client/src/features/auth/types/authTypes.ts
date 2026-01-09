// Base Types
export interface Credentials {
  user_email?: string;
  user_pass?: string;
}

export interface RegistrationDetails extends Credentials {
  user_pass_confirm?: string;
}

export interface AuthStateBase {
  userId: string | null;
  userSlug: string | null;
  token: string | null;
  tokenExpTime: Date | null;
}

// Actions
export type RegistrationAction =
  | {
      type: "ON_CHANGE";
      payload: RegistrationDetails;
    }
  | {
      type: "FORM_RESET";
    };

export type LoginAction =
  | {
      type: "ON_CHANGE";
      payload: Credentials;
    }
  | {
      type: "FORM_RESET";
    };

export type AuthReducerAction =
  | {
      type: "LOGIN";
      payload: {
        userId: string;
        token: string;
        tokenExpTime: Date;
        userSlug: string;
      };
    }
  | { type: "LOGOUT" }
  | { type: "AUTH_INITIALIZED" };

// ------------

export interface RegisterState extends BaseAuthState {
  user_pass_confirm: string;
}
