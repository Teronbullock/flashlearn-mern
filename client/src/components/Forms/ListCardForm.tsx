import Card from '../cards/Card';

interface ListCardFormProps {
  title: string;
  description?: string;
  cardCount?: number;
  id: number;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

/**
 *
 * @param children - type form
 * @returns
 */
const ListCardForm = ({
  title,
  description,
  cardCount = 0,
  onSubmit,
  children,
  id,
}: ListCardFormProps) => {
  return (
    <Card className='bg-white text-black'>
      <form onSubmit={onSubmit}>
        <div className='card__info flex justify-between flex-wrap'>
          <h3>{title}</h3>
          {cardCount || cardCount === 0 ? (
            <p className='card__body-info-title my-0'>
              Terms: {cardCount}
            </p>
          ) : null}
        </div>
        <div className='divider-h my-3'></div>
        <div className='card__header mb-3'></div>
        <div className='card__body mb-3'>
          <p className='card__desc mb-0 line-clamp line-clamp--2'>
            {description}
          </p>
        </div>
        <ul className='card__action mb-3 flex'>
          {children}
        </ul>
        <input type='hidden' name='set_id' value={id} />
        <input type='hidden' name='_method' value='DELETE' />
      </form>
    </Card>
  );
};

export default ListCardForm;
