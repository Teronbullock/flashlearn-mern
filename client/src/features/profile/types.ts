export interface UserState {
  user_email: string;
  user_pass: string;
  user_old_pass: string;
  user_pass_confirm: string;
}

export interface UserAction {
  type: "GET_PROFILE" | "ON_CHANGE" | "SUBMIT";
  payload?: {
    user_email?: string;
    user_pass?: string;
    user_old_pass?: string;
    user_pass_confirm?: string;
  };
}
