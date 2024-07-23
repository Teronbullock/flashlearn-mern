import Card from '../../../components/cards/Card';
import ListCardForm from '../../../components/Forms/ListCardForm';
import useGetCards from '../hooks/useGetsCards';
import ListItemBtn from '../../../components/Btn/ListItemBtn';
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
              id={id}
              title={term}
              description={definition}
              onSubmit={e => handlerDelete(e, id, set_id)}
            >
              <ListItemBtn
                className='btn--outline-black btn--medium mr-6'
                to={`/set/${set_id}/card/${id}/edit`}
                >
                Edit Card
              </ListItemBtn>
              <ListItemBtn
                tag='button'
                type='submit'
                className='btn--outline-black btn--medium'
              >
                Delete Card
              </ListItemBtn>
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
