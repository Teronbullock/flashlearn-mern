export interface UserAction {
  type: "GET_PROFILE" | "ON_CHANGE" | "SUBMIT" | "RESET_FORM";
  payload?: {
    user_email?: string;
    user_pass?: string;
    user_old_pass?: string;
    user_pass_confirm?: string;
  };
}
