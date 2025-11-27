export interface BaseAuthState {
  user_email: string;
  user_pass: string;
}

export interface RegisterState extends BaseAuthState {
  user_pass_confirm: string;
}

export type OnChangePayload = {
  user_email?: string;
  user_pass?: string;
  user_pass_confirm?: string;
};

export interface AuthStateBase {
  userId: string | null;
  userSlug: string | null;
  token: string | null;
  tokenExpTime: Date | null;
}

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
