import { Link } from 'react-router-dom';
import Btn from '../Btn/Btn';
import Card from '../Cards/Card';
import Form from './Form';


/**
 * 
 * @param children - type form
 * @returns 
 */
const CardDashForm = ( ) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('delete set');
  }

  return (
    <Card>
      <Form
        onSubmit={handleSubmit}
      >
        <div className="card__info flex justify-between flex-wrap">
          <p className="my-0">#1</p>
          <p className="card__body-info-title my-0">Terms: 1</p>
        </div>
        <div className="divider-h my-3"></div>
        <div className="card__header mb-3">
          <Link to={`/set/${4}`} className="card__header-title-link">
            Set 1
          </Link>
        </div>
        <div className="card__body mb-3">
          <p className="card__desc mb-0 line-clamp line-clamp--2">
            This is a set of cards
          </p>
        </div>
        <div className="card__action mb-3 flex">
          <Btn
            className='btn--medium btn--outline-black mr-3'
            to='/set/4'
            // ariaLabel='view set'
            elementType='anchor'
          >
            View
          </Btn>
          <input type="hidden" name="_method" value="DELETE" />
          <Btn 
            className='btn--medium btn--outline-dark-shade'
            dataType='submit'
            ariaLabel='delete set'
            elementType='btn'
          >
            Delete
          </Btn>
        </div>
      </Form>
    </Card>
  );
}

export default CardDashForm;