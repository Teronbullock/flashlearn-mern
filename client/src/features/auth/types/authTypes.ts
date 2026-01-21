import { BaseAuthFields, RegistrationDetails } from "@/types/auth";
import { Dispatch } from "react";

export interface AuthStateBase {
  userId: string | null;
  token: string | null;
  tokenExpTime: Date | null;
}

export interface AuthReducerState extends AuthStateBase {
  isAuthenticated: boolean | null;
  isLoading: boolean;
}

export interface ManageAuthProps {
  token: string | null;
  userId: string | null;
  logout: () => Promise<void>;
  dispatch: Dispatch<AuthReducerAction>;
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
      payload: AuthStateBase;
    }
  | { type: "LOGOUT" }
  | { type: "AUTH_INITIALIZED" };

export interface PostNewUserParams {
  userEmail: string;
  userPass: string;
  userPassConfirm: string;
}
