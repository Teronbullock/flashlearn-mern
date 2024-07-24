export interface InputState {
  inputOneValue: string | null;
  inputTwoValue: string | null;
}

export interface InputColorState {
  bgColor: string;
  textColor: string;
}

export type CardState = InputState & InputColorState;

export interface InputOneAction {
  type: 'ON_INPUT_ONE_CHANGE';
  payload: { inputOneValue: string | null };
}

export interface InputTwoAction {
  type: 'ON_INPUT_TWO_CHANGE';
  payload: { inputTwoValue: string | null };
}

export interface BgColorAction {
  type: 'ON_BG_COLOR_CHANGE';
  payload: { bgColor: string };
}

export interface TextColorAction {
  type: 'ON_TEXT_COLOR_CHANGE';
  payload: { textColor: string };
}

export interface SubmitAction {
  type: 'SUBMIT';
}

export interface ResetAction {
  type: 'RESET';
}

export interface ColorResetAction {
  type: 'RESET_COLORS';
}

export interface OnLoad {
  type: 'ON_LOAD';
  payload: InputState;
}

export interface OnCardReload {
  type: 'ON_CARD_RELOAD';
  payload: CardState;
}

export type CardAction =
  | InputOneAction
  | InputTwoAction
  | BgColorAction
  | TextColorAction
  | ResetAction
  | ColorResetAction
  | SubmitAction
  | OnCardReload;

export type SetAction =
  | InputOneAction
  | InputTwoAction
  | OnLoad
  | SubmitAction;