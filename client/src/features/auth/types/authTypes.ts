import { BaseAuthFields, RegistrationDetails } from "@/types/index";
import { Dispatch } from "react";

export interface AuthStateBase {
  userId: string | null;
  token: string | null;
  tokenExpTime: Date | number | null;
}

export interface AuthReducerState extends AuthStateBase {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type AuthReducerAction =
  | {
      type: "LOGIN";
      payload: Required<AuthStateBase>;
    }
  | { type: "LOGOUT" }
  | { type: "AUTH_INITIALIZED" };

export interface AuthContextValue extends AuthStateBase {
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  login?: () => void;
  dispatch?: Dispatch<AuthReducerAction>;
}

export type FormAction<T> =
  | { type: "ON_CHANGE"; payload: T }
  | { type: "FORM_RESET" };

export type RegistrationAction = FormAction<RegistrationDetails>;
export type LoginAction = FormAction<BaseAuthFields>;

export interface ManageAuthProps {
  token: AuthStateBase["token"];
  logout: () => Promise<void>;
  dispatch: Dispatch<AuthReducerAction>;
}

export interface UseAutoLogoutConfig {
  token: AuthStateBase["token"];
  tokenExpTime: AuthStateBase["tokenExpTime"];
  logout: () => void | Promise<void>;
}

export interface PostNewUserParams {
  email: string;
  pass: string;
  passConfirm: string;
}
