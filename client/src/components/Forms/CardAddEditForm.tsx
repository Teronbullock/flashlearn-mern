import Btn from '../Btn/Btn';
import Form from './Form';
import FormInput from './FormInput';


const CardAddEditForm = ({formType}) => {
  let submitBtnText;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('CardAddEditForm submitted');
  }

  if (formType === 'edit') {
    submitBtnText = 'Edit Card';
  } else { 
    submitBtnText = 'Add Card';
  }

  return (
    <Form
      onSubmit={handleSubmit}
    >
      <FormInput 
        labelName="Term:"
        inputObj={{
          'type': 'textarea',
          'name': 'term',
          'placeholder': 'Enter term',
          'required': true,
        }}
        onChange={() => console.log('Input changed')}
      />
      <FormInput 
        labelName="Definition:"
        inputObj={{
          'type': 'textarea',
          'name': 'definition',
          'placeholder': 'Enter Definition',
          'required': true,
        }}
        onChange={() => console.log('Input changed')}
      />
      <div className="form__group w-1/4">
        <div className="w-full">
          <Btn >
            Reset Colors
          </Btn>
        </div>
        <FormInput
          labelName="Card Color:"
          inputObj={{
            'type': 'color',
            'name': 'card-color',
            'value': '#fffff',
            'dataType': 'card-color',

          }}
          onChange={() => console.log('Input changed')}
        />
        <FormInput
          labelName="Card Text Color:"
          inputObj={{
            'type': 'color',
            'name': 'card-text-color',
            'value': '#0000',
            'dataType': 'card-text-color',
            
          }}
          onChange={() => console.log('Input changed')}
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
          to='/dashboard'
        >
          Cancel
        </Btn>
      </div>
    </Form>
  );
};

export default CardAddEditForm;