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
        type='color'
        name='bg_color'
        value={bgColor}
        dataType='card-color'
        onChange={ (e) =>
          dispatch({
            type: 'ON_CHANGE',
            payload: {
              bgColor: e.target.value,
            },
          })}
      />
      <FormInput
        labelName='Text Color:'
        type='color'
        name='text_color'
        value={textColor}
        dataType='card-text-color'
        onChange={ (e) =>
          dispatch({
            type: 'ON_CHANGE',
            payload: {
              textColor: e.target.value,
            },
          })}
      />
    </div>
  );
}

export default FormColorPicker;
