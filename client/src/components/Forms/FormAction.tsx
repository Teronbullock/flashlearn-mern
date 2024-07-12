import Btn from '../Btn/Btn';

/**
 *  -- FormAction Component --
 * FormAction component is used to render the form action buttons.
 * 
 * 
 * @param param0 
 * @returns 
 */
function FormAction({ submitBtnText, cancelBtnTo }) {
  return (
    <div className='form__action flex md:block'>
      <Btn
        tag='button'
        className='btn--large btn--tertiary text-white mr-10'
        type='submit'
      >
        {submitBtnText}
      </Btn>
      <Btn
        className='btn--large btn--outline-black'
        to={cancelBtnTo}
      >
        Cancel
      </Btn>
    </div>
  );
}

export default FormAction;