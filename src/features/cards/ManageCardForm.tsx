import Btn from '../../components/Btn/Btn';
import Form from '../../components/Forms/Form';
import FormInput from '../../components/Forms/FormInput';
import Card from '../../components/cards/Card';
import  { ManageCardFormProps } from '../../types/card-types';



const CardAddEditForm = ({
  term,
  definition,
  bgColor,
  textColor,
  to,
  onSubmit,
  formType,
  dispatch
}: ManageCardFormProps) => {

  let submitBtnText;

  if (formType === 'edit') {
    submitBtnText = 'Update';
  } else { 
    submitBtnText = 'Add';
  }


  return (
    <Card className='bg-white'>
      <Form
        onSubmit={onSubmit}
      >
        <FormInput 
          labelName="Term:"
          type={'textarea'}
          name={'term'}
          placeholder={'Enter term'}
          value={term}
          required={true}
          onChange={(e) => dispatch({ term: e.target.value })}
        />
        <FormInput 
          labelName="Definition:"
          type={'textarea'}
          name={'definition'}
          placeholder={'Enter Definition'}
          value={definition}
          required={true}
          onChange={(e) => dispatch({ definition: e.target.value })}
        />
        <div className="form__group w-1/4">
          <div className="w-full">
            <Btn
              className='btn--small bg-black text-white mb-4'
            >
              Reset Colors
            </Btn>
          </div>
          <FormInput
            labelName="Card Color:"
            type={'color'}
            name={'card-color'}
            value={bgColor}
            dataType={'card-color'}
            onChange={(e)=> dispatch({ bgColor: e.target.value })}
          />
          <FormInput
            labelName="Text Color:"
            type={'color'}
            name={'card-text-color'}
            value={textColor}
            dataType={'card-text-color'}
            onChange={(e) => dispatch({ textColor: e.target.value })}
          />
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
      </Form>
    </Card>
  );
};

export default CardAddEditForm;