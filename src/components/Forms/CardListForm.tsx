import Btn from '../Btn/Btn';
import Card from '../Cards/Card';
import Form from './Form';
import { CardListFormProps } from './form-types';


const CardListForm = ({ formData }: CardListFormProps ) => {
  const { card_term, card_definition, ID, set_id } = formData;


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('CardListForm submitted');
  };

  return (
    <Card>
      <Form 
        onSubmit={handleSubmit}
      >
        <div className="list-card__header mb-5 w-md-75">
          <h3 className="list-card mt-0 mb-2">Term:</h3>
          <p className="m-0">{card_term}</p>
          <div className="divider-h divider-h--bold my-4 d-md-none"></div>
          <h3 className="list-card__title mb-2">Definition:</h3>
          <p className="m-0">{card_definition}</p>
        </div>
        <div className="divider-v divider-v--bold d-none d-md-block mx-3"></div>
        <div className="list-card__body mb-4 mb-md-0 w-md-25">
          <div className="list-card__body-actions d-flex">
            <Btn 
              className="btn btn--small btn--outline-dark-shade mr-4" 
              to={`/set/${set_id}/card/${ID}/edit`}
              >
              Edit Card
            </Btn>
            <input type="hidden" name="_method" value="DELETE" />
            <Btn
              className='btn btn--small btn--outline-dark-shade'
              dataType='submit'
              elementType='btn'
              ariaLabel='Delete Card'
            >
              Delete Card
            </Btn>
          </div>
        </div>
      </Form>
    </Card>
  );
};

export default CardListForm;