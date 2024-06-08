import Btn from '../../Btn/Btn';

interface CardFormProps {
  cardFormData: {
    formType: 'body' | 'input';
    formClass?: string;
  };
}

const CardForm = ( { cardFormData }: CardFormProps ) => {
  const { formType } = cardFormData;
  let { formClass } = cardFormData;
  let formDataType = '';

  if (formType === 'body') {
    formClass += ' form--body p-4';
    formDataType = 'form';
  } else if (formType === 'input') {
    formClass += ' ';
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('form submitted');
  }

  return (
    <form className={`form ${formClass}`} onSubmit={handleSubmit} method="POST" data-js={`${formDataType}`}>
      {formType === 'body' ? (
        <>

        </>
       ) : (
        <>
          <input type="hidden" name="_method" value="DELETE" />
          <Btn 
            className='btn--medium btn--outline-dark-shade'
           dataType='submit'
            ariaLabel='delete set'
            elementType='btn'

          >
            Delete
          </Btn>
        </>
      )}
    </form>
  );
}

export default CardForm;