import Btn from '../Btn/Btn';
import FormInput from './FormInput';

export function FormColorPicker({ bgColor, textColor, dispatch }) {
  return (
    <div className='form__group w-1/4'>
      <div className='w-full'>
        <Btn className='btn--small bg-black text-white mb-4'>
          Reset Colors
        </Btn>
      </div>
      <FormInput
        labelName='Card Color:'
        inputProps={{
          type: 'color',
          name: 'card-color',
          value: bgColor,
          dataType: 'card-color',
          onChange: e =>
            dispatch({
              type: 'ON_CHANGE',
              payload: {
                card_color: e.target.value,
              },
            }),
        }}
      />
      <FormInput
        labelName='Text Color:'
        inputProps={{
          type: 'color',
          name: 'card-text-color',
          value: textColor,
          dataType: 'card-text-color',
          onChange: e =>
            dispatch({
              type: 'ON_CHANGE',
              payload: {
                card_text_color: e.target.value,
              },
            }),
        }}
      />
    </div>
  );
}

export default FormColorPicker;
