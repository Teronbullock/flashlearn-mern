export interface CardBase {
  inputOneValue: string;
  inputTwoValue: string;
}

export interface CardBaseColors {
  card_color?: string;
  card_text_color?: string;
}

export interface CardBaseIds {
  set_id: number;
  ID: number;
  user_id: number;
}

export interface CardWithColor extends CardBase, CardBaseColors {}
export interface CardDataConfig  extends CardBase, CardBaseIds {}
export interface CardType extends CardDataConfig, CardBaseColors, CardBaseIds {}

export interface CardInitialState extends Partial<CardBase>, CardBaseColors {
  inputOneValue?: string;
  inputTwoValue?: string;
}

export type CardReducerAction = { type: 'update_card' | 'on_change'; payload: Partial<CardWithColor> };

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface ManageCardFormProps {
  formType: 'card' | 'set';
  inputValues: string[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  dispatch: React.Dispatch<any>;
  children: React.ReactNode;
  submitBtnText: string;
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


export interface