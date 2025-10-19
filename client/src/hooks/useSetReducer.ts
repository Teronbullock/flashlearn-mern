import { useReducer } from "react";

export interface SetReducerState {
  inputOneValue?: string;
  inputTwoValue?: string;
}

export type SetReducerAction =
  | { type: "ON_LOAD"; payload: Partial<SetReducerState> }
  | { type: "ON_INPUT_ONE_CHANGE"; payload: { inputOneValue: string } }
  | { type: "ON_INPUT_TWO_CHANGE"; payload: { inputTwoValue: string } }
  | { type: "SUBMIT"; payload?: undefined };

const reducer = (
  state: SetReducerState,
  action: SetReducerAction,
): SetReducerState => {
  switch (action.type) {
    case "ON_LOAD":
      return { ...state, ...action.payload };
    case "ON_INPUT_ONE_CHANGE":
      return { ...state, inputOneValue: action.payload.inputOneValue };
    case "ON_INPUT_TWO_CHANGE":
      return { ...state, inputTwoValue: action.payload.inputTwoValue };
    case "SUBMIT":
      return { inputOneValue: "", inputTwoValue: "" };
    default:
      return state;
  }
};

export const useSetReducer = () =>
  useReducer(reducer, { inputOneValue: "", inputTwoValue: "" });
