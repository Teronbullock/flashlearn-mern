import Btn from '../Btn/Btn';
import FormInput from './FormInput';
import { CardAction } from '../../features/cards/types/card-types';

type FormColorPickerProps = {
  bgColor?: string;
  textColor?: string;
  dispatch: (action: CardAction) => void;
};


export const FormColorPicker = ({
  bgColor = 'ffffff',
  textColor = '000000',
  dispatch,
}: FormColorPickerProps) => {

  const handleResetColors = () => {
    dispatch({
      type: 'RESET_COLORS',
    });
  }

  return (
    <div className='form__group w-1/4'>
      <div className='w-full'>
        <Btn 
          className='btn--small bg-black text-white mb-4'
          onClick={handleResetColors}
        >
          Reset Colors
        </Btn>
      </div>
      { bgColor && (
        <FormInput
          labelName='Card Color:'
          type='color'
          name='bg_color'
          value={bgColor}
          datatype='card-color'
          onChange={e =>
            dispatch({
              type: 'ON_BG_COLOR_CHANGE',
              payload: {
                bgColor: e.target.value,
              },
            })
          }
        />
      )}
      { textColor && (
        <FormInput
          labelName='Text Color:'
          type='color'
          name='text_color'
          value={textColor}
          datatype='card-text-color'
          onChange={e =>
            dispatch({
              type: 'ON_TEXT_COLOR_CHANGE',
              payload: {
                textColor: e.target.value,
              },
            })
          }
        />
      )}
    </div>
  );
};

export default FormColorPicker;
