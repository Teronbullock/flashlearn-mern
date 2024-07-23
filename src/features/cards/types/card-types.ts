export interface CardInputState {
  inputOneValue: string | null;
  inputTwoValue: string | null;
}

export interface CardColorState {
  bgColor: string;
  textColor: string;
}

export type CardState = CardInputState & CardColorState;

export interface CardInputOneAction {
  type: 'ON_INPUT_ONE_CHANGE';
  payload: { inputOneValue: string | null };
}

export interface CardInputTwoAction {
  type: 'ON_INPUT_TWO_CHANGE';
  payload: { inputTwoValue: string | null };
}

export interface CardBgColorAction {
  type: 'ON_BG_COLOR_CHANGE';
  payload: { bgColor: string };
}

export interface CardTextColorAction {
  type: 'ON_TEXT_COLOR_CHANGE';
  payload: { textColor: string };
}

export interface CardSubmitAction {
  type: 'SUBMIT';
  payload: CardState;
}

export interface CardRestAction {
  type: 'REST';
}

export interface CardColorResetAction {
  type: 'RESET_COLORS';
}

export type CardAction =
  | CardInputOneAction
  | CardInputTwoAction
  | CardBgColorAction
  | CardTextColorAction
  | CardRestAction
  | CardColorResetAction
  | CardSubmitAction;

