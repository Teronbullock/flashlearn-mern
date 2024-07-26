 import Card from '../../../components/Card/Card';
import ListCardForm from '../../../components/Forms/ListCardForm';
import useGetCards from '../hooks/useGetsCards';
import Btn from '../../../components/Btn/Btn';
import useDeleteCard from '../hooks/useDeleteCard';

const CardFeed = () => {
  const { cards, refreshCards } = useGetCards();
  const { handlerDelete } = useDeleteCard(refreshCards);

  return (
    <section className='container py-12'>
      {cards  && cards.length > 0 ? (
        cards.map((card) => {
          const { id, definition, term, set_id } = card;

          return (
            <ListCardForm
              key={id}
              title={term}
              description={definition}
              onSubmit={e => handlerDelete(e, id, set_id)}
            >
              <Btn
                className='btn--outline-black btn--medium mr-6'
                to={`/set/${set_id}/card/${id}/edit`}
                isListItem={true}
                data-Test='edit-card'
                >
                Edit Card
              </Btn>
              <Btn
                tag='button'
                type='submit'
                className='btn--outline-black btn--medium'
                isListItem={true}
              >
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
