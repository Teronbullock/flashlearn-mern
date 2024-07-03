import Btn from '../Btn/Btn';
import FormInput from './FormInput';
import Card from '../cards/Card';
import  { ManageCardFormProps } from '../../types/card-types';



const CardAddEditForm = ({
  inputOneValue,
  inputTwoValue,
  bgColor,
  textColor,
  to,
  onSubmit,
  submitBtnText,
  dispatch,
  inputOneLabel,
  inputTwoLabel,
}: ManageCardFormProps) => {

  console.log( 'colors:', bgColor, textColor );
  return (
    <Card className='bg-white'>
      <form
        onSubmit={onSubmit}
      >
        <FormInput 
          labelName={inputOneLabel}
          type={'textarea'}
          name={'term'}
          placeholder={`Enter ${inputOneLabel}`}
          value={inputOneValue}
          required={true}
          onChange={(e) => dispatch({
            type: 'on_change',
            payload: {inputOneValue: e.target.value}
          })}
        />
        <FormInput 
          labelName={inputTwoLabel}
          type={'textarea'}
          name={'definition'}
          placeholder={`Enter ${inputTwoLabel}`}
          value={inputTwoValue}
          required={true}
          onChange={(e) => dispatch({
            type: 'on_change',
            payload: {inputTwoValue: e.target.value}
          })}
        />
        <div className="form__group w-1/4">
          { bgColor && textColor ? (
            <>
              <div className="w-full">
                <Btn
                  className='btn--small bg-black text-white mb-4'
                >
                  Reset Colors
                </Btn>
              </div>
              <FormInput
                labelName="Card Color:"
                type='color'
                name='card-color'
                value={bgColor}
                dataType='card-color'
                onChange={(e)=> dispatch({
                  type: 'on_change',
                  payload: {card_color: e.target.value}
                })}
              />
              <FormInput
                labelName="Text Color:"
                type='color'
                name='card-text-color'
                value={textColor}
                dataType='card-text-color'
                onChange={(e)=> dispatch({
                  type: 'on_change',
                  payload: {card_text_color: e.target.value}
                })}
              />
            </>
          ) : null}
        </div>
        <div className="form__action flex md:block">
          <Btn
            elementType='btn'
            className='btn--large btn--tertiary text-white mr-10'
            type='submit'
          >
            {submitBtnText}
          </Btn>
          <Btn
            elementType='anchor'
            className='btn--large btn--outline-black'
            to={to}
          >
            Cancel
          </Btn>
        </div>
      </form>
    </Card>
  );
};

export default CardAddEditForm;