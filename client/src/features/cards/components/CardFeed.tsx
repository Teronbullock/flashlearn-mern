import Card from '@components/Card/Card';
import ListCardForm from '@components/Forms/ListCardForm';
import Btn from '@components/Btn/Btn';

interface ICardFeed {
  cards: {
    id: string;
    term: string;
    definition: string;
    set_id: string;
  }[];
  deleteCardHandler: (e: React.FormEvent<HTMLFormElement>, cardId: string, setId: string) => void;
}

const CardFeed = ({ cards, deleteCardHandler }: ICardFeed) => {
  return (
    <section className='container py-12'>
      {cards && cards.length > 0 ? (
        cards.map(card => {
          const { id, definition, term, set_id } = card;

          return (
            <ListCardForm
              key={id}
              title={term}
              description={definition}
              onSubmit={e => deleteCardHandler(e, id, set_id)}
            >
              <Btn
                className='btn--outline-black btn--small mr-3 md:mr-6'
                to={`/set/${set_id}/card/${id}/edit`}
                isListItem={true}
              >
                Edit Card
              </Btn>
              <Btn tag='button' type='submit' className='btn--outline-black btn--small' isListItem={true}>
                Delete Card
              </Btn>
            </ListCardForm>
          );
        })
      ) : (
        <Card className='bg-white'>
          <p>No cards found</p>
        </Card>
      )}
    </section>
  );
};

export default CardFeed;
