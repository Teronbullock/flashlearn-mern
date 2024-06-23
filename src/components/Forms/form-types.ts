export interface FormProps {
  children: React.ReactNode;
  isCard?: boolean;
  formData?: {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    title?: string;
    className?: string;
    hasTitle?: boolean;
    titleClassName?: string;
    dataType? : string;
  };
}

interface FormPropsBase {
  formConfig: {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  };
}

export interface DashboardSetConfig extends FormPropsBase {
  formConfig: {
    onSubmit: FormPropsBase['formConfig']['onSubmit'];
    title: string;
    description?: string;
    ID: number;
    user_id: number;
    cardCount: number;
  };
}

export interface CardListConfig extends FormPropsBase {
  formConfig: {
    onSubmit: FormPropsBase['formConfig']['onSubmit'];
    card_definition: string;
    card_term: string;
    ID: number;
    set_id: number;
  };
}

export interface RegFormState {
  user_name: string;
  user_email: string;
  user_pass: string;
  user_pass_confirm: string;
}

export interface RegFormAction {
  [key: string]: string;
}






export interface LoginFormState {
  user_name: string;
  user_pass: string;
}