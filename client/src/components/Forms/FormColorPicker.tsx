import { Btn } from "@components/btn";
import FormInput from "./FormInput";

interface CardState {
  inputOneValue?: string;
  inputTwoValue?: string;
  bgColor?: string;
  textColor?: string;
}

type CardAction =
  | {
      type:
        | "SET_INPUT_ONE"
        | "SET_INPUT_TWO"
        | "SET_BG_COLOR"
        | "SET_TEXT_COLOR";
      payload: {
        inputOneValue?: string;
        inputTwoValue?: string;
        bgColor?: string;
        textColor?: string;
      };
    }
  | { type: "RESET_COLORS" }
  | {
      type: "ON_CARD_RELOAD";
      payload: CardState;
    };

type FormColorPickerProps = {
  bgColor?: string;
  textColor?: string;
  dispatch: (action: CardAction) => void;
};

export const FormColorPicker = ({
  bgColor = "ffffff",
  textColor = "000000",
  dispatch,
}: FormColorPickerProps) => {
  const handleResetColors = () => {
    dispatch({
      type: "RESET_COLORS",
    });
  };

  return (
    <div className="form__group">
      <div>
        <Btn
          className="btn--small mb-4 bg-black text-white"
          onClick={handleResetColors}
        >
          Reset Colors
        </Btn>
      </div>
      <div className="flex">
        {bgColor && (
          <FormInput
            containerClassName="w-1/2 md:w-1/4"
            className="mr-4"
            labelName="Card Color:"
            type="color"
            name="bg_color"
            value={bgColor}
            datatype="card-color"
            onChange={(e) =>
              dispatch({
                type: "SET_BG_COLOR",
                payload: {
                  bgColor: e.target.value,
                },
              })
            }
          />
        )}
        {textColor && (
          <FormInput
            containerClassName="w-1/2 md:w-1/4"
            className="mr-4"
            labelName="Text Color:"
            type="color"
            name="text_color"
            value={textColor}
            datatype="card-text-color"
            onChange={(e) =>
              dispatch({
                type: "SET_TEXT_COLOR",
                payload: {
                  textColor: e.target.value,
                },
              })
            }
          />
        )}
      </div>
    </div>
  );
};

export default FormColorPicker;
