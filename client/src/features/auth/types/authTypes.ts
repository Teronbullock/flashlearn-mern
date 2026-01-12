import { BaseAuthFields, RegistrationDetails } from "@/types/auth";

export interface AuthStateBase {
  userId: string | null;
  userSlug: string | null;
  token: string | null;
  tokenExpTime: Date | null;
}

export interface AuthReducerState extends AuthStateBase {
  isAuthenticated: boolean | null;
  isLoading: boolean;
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
      payload: BaseAuthFields;
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
