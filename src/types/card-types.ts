// import { FormProps } from './form-types';

// interface CardPropsBase {
//   children: React.ReactNode;
//   cardType?: 'card' | 'form'| null;
// }

// interface CardPropsWithForm extends CardPropsBase {
//   cardType?: 'form';
//   onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
//   formData?: FormProps;
// }

// interface CardPropsWithoutForm extends CardPropsBase {
//   cardType: 'card';
//   onSubmit?: never;
//   formData?: never; 
// }

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface ManageCardFormProps {
  inputOneLabel: string;
  inputTwoLabel: string;
  inputOneValue?: string;
  inputTwoValue?: string;
  set_id?: number;
  ID?: number;
  user_id?: number;
  submitBtnText: 'add' | 'Update' | 'Create';
  textColor?: string;
  bgColor?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  to: string;
  dispatch: React.Dispatch<any>;
}

export interface CardType {
  ID: number;
  card_color?: string;
  card_definition: string;
  card_term: string;
  card_text_color?: string;
  set_id: number;
  user_id: number;
}

export interface CardDataConfig {
  card_definition: string;
  card_term: string;
  set_id: number;
  user_id: number;
  ID: number;
}

export type CardCurrnentPage = 'addCardPage' | 'editCardPage';

export interface CardReducerInterface {
  (
    state: object,
    action: {
      type: string;
      payload: object
    }
  ): object;
}