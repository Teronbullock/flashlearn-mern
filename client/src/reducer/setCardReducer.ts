export interface setCardReducerState {
  inputOneValue?: string;
  inputTwoValue?: string;
}

export type setCardReducerAction =
  | { type: "ON_LOAD"; payload: Partial<setCardReducerState> }
  | { type: "ON_INPUT_ONE_CHANGE"; payload: { inputOneValue: string } }
  | { type: "ON_INPUT_TWO_CHANGE"; payload: { inputTwoValue: string } }
  | { type: "SUBMIT"; payload?: undefined };

export const setCardReducerInitState = {
  inputOneValue: "",
  inputTwoValue: "",
};

export const setCardReducer = (
  state: setCardReducerState,
  action: setCardReducerAction,
): setCardReducerState => {
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
