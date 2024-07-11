import { ListCardFormProps } from '../../types/set-types';
import Card from '../cards/Card';

/**
 * 
 * @param children - type form
 * @returns 
 */
const ListCardForm = ( { 
  title,
  description,
  cardCount = 0,
  onSubmit,
  children
}: ListCardFormProps ) => {

  return (
    <Card className='bg-white text-black'>
      <form onSubmit={onSubmit} >
        <div className="card__info flex justify-between flex-wrap">
          <h3>{title}</h3>
          <p className="card__body-info-title my-0">{`Terms: ${cardCount}`}</p>
        </div>
        <div className="divider-h my-3"></div>
        <div className="card__header mb-3">
        </div>
        <div className="card__body mb-3">
          <p className="card__desc mb-0 line-clamp line-clamp--2">
            {description}
          </p>
        </div>
        {children}
      </form>
    </Card>
  );
}

export default ListCardForm;