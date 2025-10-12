export interface LoginState {
  type: "login";
  user_email: string;
  user_pass: string;
}

export interface RegisterState {
  type: "register";
  user_email: string;
  user_pass: string;
  user_pass_confirm: string;
}

export type UserState = RegisterState | LoginState;

export type OnChangePayload = {
  user_email?: string;
  user_pass?: string;
  user_pass_confirm?: string;
};

export type AuthReducerAction =
  | {
      type: "ON_CHANGE";
      payload: OnChangePayload;
    }
  | { type: "REG_SUBMIT" }
  | { type: "LOGIN_SUBMIT" }
  | {
      type: "SET_STATE_TYPE";
      payload: "login" | "register";
    };
