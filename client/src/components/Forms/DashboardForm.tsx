import { Link } from 'react-router-dom';
import Btn from '../Btn/Btn';
import Card from '../Cards/Card';
import Form from './Form';
import { DashboardFormProps } from './form-types.ts';

/**
 * 
 * @param children - type form
 * @returns 
 */
const DashboardForm = ( { formData }: DashboardFormProps ) => {
  const { title, description, ID, cardCount } = formData;


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
          <p className="card__body-info-title my-0">{`Terms: ${cardCount}`}</p>
        </div>
        <div className="divider-h my-3"></div>
        <div className="card__header mb-3">
          <Link to={`/set/${ID}`} className="card__header-title-link">
            {title}
          </Link>
        </div>
        <div className="card__body mb-3">
          <p className="card__desc mb-0 line-clamp line-clamp--2">
            {description}
          </p>
        </div>
        <div className="card__action mb-3 flex">
          <Btn
            className='btn--medium btn--outline-black mr-3'
            to={`/set/${ID}`}
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

export default DashboardForm;