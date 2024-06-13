
export interface RegFormState {
  user_name: string;
  user_email: string;
  user_pass: string;
  user_pass_confirm: string;
}

export interface RegFormAction {
  [key: string]: string;
}