import { Link } from 'react-router-dom';
import Btn from '../Btn/Btn';
import Form from './Form';
import { ListCardFormProps } from '../../types/user-types';
import Card from '../cards/Card';

/**
 * 
 * @param children - type form
 * @returns 
 */
const ListCardForm = ( { 
  title,
  description,
  cardCount,
  onSubmit,
  listType,
  to,
  ID
}: ListCardFormProps ) => {
  let cardCountContent;

  if (cardCount) {
    cardCountContent= <p className="card__body-info-title my-0">{`Terms: ${cardCount}`}</p>
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(e, ID);
  }

  return (
    <Card className='bg-white text-black'>
      <Form onSubmit={handleSubmit} id={ID}>
        <div className="card__info flex justify-between flex-wrap">
          <h3>
            <Link to={to} className="card__header-title-link">
              {title}
            </Link>
          </h3>
          {/* <p className="card__body-info-title my-0">{`Terms: ${cardCount}`}</p> */}
          {cardCountContent}
        </div>
        <div className="divider-h my-3"></div>
        <div className="card__header mb-3">
        </div>
        <div className="card__body mb-3">
          <p className="card__desc mb-0 line-clamp line-clamp--2">
            {description}
          </p>
        </div>
        <div className="card__action mb-3 flex">
          <Btn
            className='btn--medium btn--outline-black mr-3'
            to={to}
            // ariaLabel='view set'
            elementType='anchor'
          >
            {listType === 'set' ? 'View' : 'Edit Card'}
          </Btn>
          <input type="hidden" name="set_id" value={ID} />
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

export default ListCardForm;